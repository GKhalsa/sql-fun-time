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
    };

    async componentDidMount() {

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
                            SQL FUN TIME
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
