import React, {Component} from 'react';
import AceEditor from 'react-ace';
import ReactTable from "react-table";
import sql from 'sql.js';
import {levels} from './levelText'

import './App.css';
import 'brace/mode/mysql';
import 'brace/theme/monokai';
import 'react-table/react-table.css'

class App extends Component {

    state = {
        sqlValue: `select * from person;`,
        dbValues: [],
        dbColumns: [],
        queryValues: [],
        queryColumns: [],
        dropDownOpen: false,
    };

    async componentDidMount() {
        document.addEventListener("mousedown", this.checkForClickOutsideLevels);

        const createTable =
            `CREATE TABLE IF NOT EXISTS
              person(
                id serial PRIMARY KEY,
                name VARCHAR(128) NOT NULL,
                age INT NOT NULL
              )`;


        const insert = `INSERT into person (id, name, age) values (${Date.now()},'Asem',12)`;
        const insert2 = `INSERT into person (id, name, age) values (${Date.now() + 1},'Asem',12)`;

        this.db = new sql.Database();
        this.db.run(createTable);
        this.db.run(insert);
        this.db.run(insert2);
        // this.db.run(insert);
        let res = this.db.exec("select * from person");
        //
        const {columns, values} = res[0];
        const dbColumns = columns.map(column => {
            return {Header: this.capitalize(column), accessor: column}
        });

        const dbValues = values.map((valueSet) => {
            return valueSet.reduce((acc, value, index) => {
                acc[columns[index]] = value;
                return acc;
            }, {})
        });

        this.setState({dbColumns, dbValues});
    }

    componentWillUnmount(){
        document.addEventListener("mousedown", this.checkForClickOutsideLevels);
    }

    checkForClickOutsideLevels = (e) => {
        if (!e.target.classList.contains("dropdown")){
            this.setState({dropDownOpen:false})
        }
    };

    areObjectsEqual(obj1, obj2) {
        const a = Object.keys(obj1).every(key => {
            return obj1[key] === obj2[key]
        })

        const b = Object.keys(obj2).every(key => {
            return obj1[key] === obj2[key]
        })

        return a && b;
    }


    checkForMatch = (queryColumns, queryValues) => {
        const {dbColumns, dbValues} = this.state;


        const a = dbColumns.every((dbColumn) => {
            return queryColumns.some((queryColumn) => {
                return dbColumn.accessor === queryColumn.accessor;
            })
        });

        const b = queryColumns.every((queryColumn) => {
            return dbColumns.some((dbColumn) => {
                return dbColumn.accessor === queryColumn.accessor;
            })
        });

        const c = dbValues.every((dbValue) => {
            return queryValues.some((queryValue) => {
                return this.areObjectsEqual(dbValue, queryValue)
            })
        });

        const d = queryValues.every((queryValue) => {
            return dbValues.some((dbValue) => {
                return this.areObjectsEqual(dbValue, queryValue)
            })
        });


    };

    submitSql = () => {
        let res = this.db.exec(this.state.sqlValue);
        const {columns, values} = res[0];
        const queryColumns = columns.map(column => {
            return {Header: this.capitalize(column), accessor: column}
        });

        const queryValues = values.map((valueSet) => {
            return valueSet.reduce((acc, value, index) => {
                acc[columns[index]] = value;
                return acc;
            }, {})
        });

        this.checkForMatch(queryColumns, queryValues);

        this.setState({queryColumns, queryValues});
    };

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    onSqlChange = (sqlValue) => {
        this.setState({sqlValue})
    };

    render() {
        const {dbValues, dbColumns, queryValues, queryColumns} = this.state;
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
                                                {[1,2,3,4,5,6,7,8,9,10,11].map((level) => {
                                                    return (
                                                        <div className="level__option dropdown">{level}</div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        :
                                        null}
                                </div>
                            </div>

                        </div>

                        <div className="left__level__text">
                            {levels['1']}
                        </div>

                        <AceEditor
                            height="13em"
                            width="45em"
                            mode="mysql"
                            theme="monokai"
                            name="blah2"
                            // onLoad={this.onLoad}
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
                        <button onClick={this.submitSql}>Run</button>


                    </div>

                    <div className="App__right">
                        <div className="">

                            <ReactTable
                                data={queryValues}
                                header="Users"
                                columns={queryColumns}
                                defaultPageSize={4}
                                showPageSizeOptions={false}
                                showPagination={false}
                                style={{
                                    height: "150px"
                                }}
                            />

                            <div>Person Table</div>

                            <ReactTable
                                data={dbValues}
                                columns={dbColumns}
                                defaultPageSize={4}
                                showPageSizeOptions={false}
                                showPagination={false}
                                style={{
                                    height: "150px"
                                }}
                            />
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default App;
