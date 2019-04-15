import React, {Component} from 'react';
import AceEditor from 'react-ace';
import sql from 'sql.js';
import {levelText, queries} from './levelData'
import {checkForMatch, capitalize, determineGlow} from './helpers'
import {Table} from './Table'

import './App.css';
import 'brace/mode/mysql';
import 'brace/theme/monokai';
import 'react-table/react-table.css'

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            sqlValue: ``,
            queryValues: [],
            queryColumns: [],
            dropDownOpen: false,
            level: null,
            completedLevels: [],
            levelText: '',
            tablesWithValues:{},
            expectedColumns:[],
            expectedValues: [],
            submitGlow:"",
            error: ""
        };
        this.db = new sql.Database();
    }

    formatColumns(columns){
        let formattedColumns = [];

        columns.forEach((column) => {
           const duplication = formattedColumns.some(formattedColumn => {
               return Object.values(formattedColumn).includes(column)
           });

            if (duplication) {
                formattedColumns.push({Header: capitalize(column), accessor: column + 1});
            } else {
                formattedColumns.push({Header: capitalize(column), accessor: column});
            }
        });

        return formattedColumns;
    }

    formatValues(columns, values){
        return values.map((valueSet) => {
            return valueSet.reduce((acc, value, index) => {
                if (acc.hasOwnProperty(columns[index])) {
                    acc[columns[index] + 1] = value;
                } else {
                    acc[columns[index]] = value;
                }
                return acc;
            }, {})
        });
    }

    clear = () => {
        for (const table in this.state.tablesWithValues) {
            const dropQuery = "DROP TABLE IF EXISTS " + table;
            this.db.exec(dropQuery);
        }
        this.setState({queryValues:[], queryColumns:[], tablesWithValues:{}, sqlValue:""})
    };

    levelSetup = (level) => {
        this.clear();
        this.db.run(queries[level].databaseSetup);
        const tables = this.db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")[0].values;
        const tablesWithValues = tables.reduce((acc,table) => {
            const {columns, values} = this.db.exec(`SELECT * from ${table}`)[0];
            const columnsWithoutPeriods = columns.map(column => column.replace(/\./g,'-'));
            acc[table] = {
                columns: this.formatColumns(columnsWithoutPeriods),
                values: this.formatValues(columnsWithoutPeriods, values)
            };
            return acc
        }, {});

        const {columns, values} = this.db.exec(queries[level].answer)[0];
        const columnsWithoutPeriods = columns.map(column => column.replace(/\./g,'-'));
        this.setState({dropDownOpen:false,tablesWithValues, levelText: levelText[level], expectedValues: this.formatValues(columnsWithoutPeriods, values), expectedColumns: this.formatColumns(columnsWithoutPeriods)})
    };

    componentDidUpdate(_,prevState) {
        if (prevState.level !== this.state.level) {
            this.levelSetup(this.state.level)
        }
    }

    async componentDidMount() {
        document.addEventListener("mousedown", this.checkForClickOutsideLevels);
        const storageState = localStorage.getItem('sqlState');
        if (storageState) {
            const parsedState = JSON.parse(storageState);
            const {level, completedLevels} = parsedState;
            this.setState({level, completedLevels})
        } else {
            this.setState({level: 1})
        }

    }

    componentWillUnmount(){
        document.addEventListener("mousedown", this.checkForClickOutsideLevels);
    }

    checkForClickOutsideLevels = (e) => {
        if (!e.target.classList.contains("dropdown")){
            this.setState({dropDownOpen:false})
        }
    };

    submitSql = async () => {
        const {expectedColumns, expectedValues, level, completedLevels,submitGlow, sqlValue} = this.state;
        if (sqlValue == "") {return;}
        let res;

        try {
            res = this.db.exec(sqlValue);
        } catch (e){
            this.setState({error: e.message});
            return;
        }

        if (res.length !== 0) {

            const {columns, values} = res[0];
            const columnsWithoutPeriods = columns.map(column => column.replace(/\./g,'-'));
            const queryColumns = this.formatColumns(columnsWithoutPeriods);
            const queryValues = this.formatValues(columnsWithoutPeriods,values);


            const isMatch = checkForMatch(queryColumns, queryValues, expectedColumns, expectedValues);
            const getSubmitGlow = determineGlow(isMatch,submitGlow);

            if (isMatch) {
                const addToCompletedLevels = [...completedLevels,level];
                this.setState({queryColumns, queryValues, level: level + 1, completedLevels: addToCompletedLevels, submitGlow: getSubmitGlow, error:""})
            } else {
                this.setState({queryColumns, queryValues, submitGlow:getSubmitGlow, error:""});
            }
        } else {
            this.setState({error: "", queryColumns:[], queryValues:[], submitGlow:determineGlow(false,submitGlow)})
        }
    };

    render() {
        const {queryValues, queryColumns, expectedColumns, expectedValues, tablesWithValues, level, completedLevels, submitGlow, error} = this.state;
        return (
            <div className="App">

                <div className="App__main">

                    <div className="App__left">

                        <div className="App__header">
                            <div>
                                SQL FUN TIME
                            </div>
                            <div>
                                <div className="level__select dropdown">
                                    <i onClick={() => this.setState(prevState => ({level: (prevState.level > 1) ? prevState.level - 1 : prevState.level}))} className="arrow__left dropdown"> </i>
                                    <div className="select__dropdown dropdown"
                                         onClick={() => this.setState((prevState) => ({dropDownOpen: !prevState.dropDownOpen}))} >
                                        Level {level}
                                    </div>
                                    <i onClick={() => this.setState(prevState => ({level: (prevState.level < Object.keys(levelText).length) ? prevState.level + 1 : prevState.level}))} className="arrow__right dropdown"> </i>
                                </div>
                                <div className="level__drop__container dropdown">
                                    {this.state.dropDownOpen ?
                                        <div>
                                            <div className="arrow-up__container dropdown">
                                                <div className="arrow-up dropdown"></div>
                                            </div>

                                            <div className="level__drop__box dropdown">
                                                {
                                                    Object.keys(levelText).map((levelNum) => {
                                                        return (
                                                            <div onClick={() => this.setState({level: parseInt(levelNum)})} className={`level__option dropdown ${completedLevels.some(completedLevel => completedLevel == levelNum.toString()) ? "level__complete":""} ${levelNum == level ? "current__level__option":""}`}>{levelNum}</div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        :
                                        null}
                                </div>
                            </div>

                        </div>

                        <div className="left__level__text">
                            {levelText[level]}
                        </div>

                        <div className="ace__editor__wrapper">
                            <AceEditor
                                name="ace-editor"
                                mode="mysql"
                                theme="monokai"
                                style={{margin: '2em', animation: `${submitGlow} 1s 2 alternate`}}
                                onChange={(sqlValue) => this.setState({sqlValue})}
                                fontSize={16}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                value={this.state.sqlValue}
                                setOptions={{
                                    enableBasicAutocompletion: false,
                                    enableLiveAutocompletion: false,
                                    enableSnippets: false,
                                    showLineNumbers: true,
                                    tabSize: 2,
                                    wrap: true,
                                }}/>
                        </div>
                        <div>
                            {error}
                        </div>

                        <div className="button__group">
                            <button className="run__button" onClick={() => this.setState({sqlValue: queries[level].answer})}>Show Answer</button>
                            <button className="run__button" onClick={this.submitSql}>Run</button>
                        </div>

                    </div>

                    <div className="App__right">
                        <div className="">

                            <Table header="Query Result" values={queryValues} columns={queryColumns}/>
                            <Table header="Expected Result" values={expectedValues} columns={expectedColumns}/>
                            {
                                Object.keys(tablesWithValues).map(table => {
                                    const {columns, values} = tablesWithValues[table];
                                    return <Table header={table} values={values} columns={columns}/>
                                })
                            }

                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default App;
