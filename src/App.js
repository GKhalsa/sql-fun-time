import React, {Component} from 'react';
import AceEditor from 'react-ace';
import sql from 'sql.js';
import {levelText, queries} from './levelData'
import {checkForMatch, capitalize} from './helpers'
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
            expectedValues: []
        };
        this.db = new sql.Database();
    }

    formatColumns(columns){
        return columns.map(column => {
                return {Header: capitalize(column), accessor: column}
            });
    }

    formatValues(columns, values){
        return values.map((valueSet) => {
            return valueSet.reduce((acc, value, index) => {
                acc[columns[index]] = value;
                return acc;
            }, {})
        });
    }

    clear = () => {
        for (const table in this.state.tablesWithValues) {
            const dropQuery = "DROP TABLE IF EXISTS " + table;
            this.db.exec(dropQuery);
        }
        this.setState({queryValues:[], queryColumns:[], tablesWithValues:{}})
    }

    levelSetup = (level) => {
        this.clear()
        this.db.run(queries[level].databaseSetup);
        const tables = this.db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")[0].values;
        const tablesWithValues = tables.reduce((acc,table) => {
            const {columns, values} = this.db.exec(`SELECT * from ${table}`)[0];
            acc[table] = {
                columns: this.formatColumns(columns),
                values: this.formatValues(columns, values)
            };
            return acc
        }, {});

        const {columns, values} = this.db.exec(queries[level].answer)[0];
        this.setState({tablesWithValues, levelText: levelText[level], expectedValues: this.formatValues(columns, values), expectedColumns: this.formatColumns(columns)})
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
            const parsedState = JSON.parse(storageState)
            const {level, completedLevels} = parsedState
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


    submitSql = () => {
        let res = this.db.exec(this.state.sqlValue);
        const {columns, values} = res[0];

        const queryColumns = columns.map(column => {
            return {Header: capitalize(column), accessor: column}
        });

        const queryValues = values.map((valueSet) => {
            return valueSet.reduce((acc, value, index) => {
                acc[columns[index]] = value;
                return acc;
            }, {})
        });

        const {expectedColumns, expectedValues, level, completedLevels} = this.state;

        const isMatch = checkForMatch(queryColumns, queryValues, expectedColumns, expectedValues);

        if (isMatch) {
            completedLevels.push(level);
            this.setState({queryColumns, queryValues, level: level + 1, completedLevels})
        }

        this.setState({queryColumns, queryValues});
    };


    onSqlChange = (sqlValue) => {
        this.setState({sqlValue})
    };

    render() {
        const {queryValues, queryColumns, expectedColumns, expectedValues, tablesWithValues, level} = this.state;
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
                                    <i className="arrow__left dropdown"> </i>
                                    <div className="select__dropdown dropdown"
                                         onClick={() => this.setState((prevState) => ({dropDownOpen: !prevState.dropDownOpen}))} >
                                        Level 1
                                    </div>
                                    <i className="arrow__right dropdown"> </i>
                                </div>
                                <div className="level__drop__container dropdown">
                                    {this.state.dropDownOpen ?
                                        <div>
                                            <div className="arrow-up__container dropdown">
                                                <div class="arrow-up dropdown"></div>
                                            </div>

                                            <div className="level__drop__box dropdown">
                                                {
                                                    Object.keys(levelText).map((level) => {
                                                        return (
                                                            <div className="level__option dropdown">{level}</div>
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

                        <AceEditor
                            height="13em"
                            width="45em"
                            mode="mysql"
                            theme="monokai"
                            name="blah2"
                            onChange={this.onSqlChange}
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
                        <div className="button__group">
                            <button className="run__button" >Show Answer</button>
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
