import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import neo4j from "neo4j-driver/lib/browser/neo4j-web";
import CorporateLoader from "./corporateLoader";
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/JSONPretty.1337.styl';
import APIAccessor from "./APIAccessor";



class App extends Component {
    constructor(props) {
        super(props);

        const neo4jDriver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "1234"));
        const neo4jSession = neo4jDriver.session();
        let OCL_props = {
            neo4jSession
        };
        const cl = new APIAccessor(OCL_props);
        this.state = {
            cl,
            input: "",
            displayVal: "{}"
        };

    }

    handleChange(event) {
        this.setState({input: event.target.value})
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <form onSubmit={this.runDemo.bind(this)}>
                    <input type="text" name="input" value={this.state.input} onChange={this.handleChange.bind(this)}/>
                    <button onClick={this.runDemo.bind(this)}>Activate Lasers</button>
                </form>
                <JSONPretty className="Code" themeClassName="1337" json={this.state.displayVal}/>
            </div>
        );
    }

    runDemo(event) {
        if (event) event.preventDefault();

        this.state.cl
            .wikidata_searchNames(this.state.input)
            .then(value => {
                console.log(value);

                this.setState({displayVal: value});
                //this.setState({displayVal: JSON.stringify(value, null, 2)});
            });
    }
}

export default App;
