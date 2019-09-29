import React, {Component} from "react";
import {Redirect, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {getStats} from "./services/statService";

class App extends Component {
  state = {
    selectedOption: '2008',
    data: {}
  };

  componentDidMount() {
    console.log("componentDidMount")
    this.state.selectedOption = "2008";
    this.getData();
  }

  handleChange = (event) => {
    const selectedOption = event.target.value;
    this.setState({selectedOption})
    this.getData();
  };

  async getData() {
    try {
      const {data} = await getStats(this.state.selectedOPtion)
      console.log(data)
      this.setState({data})
    } catch (ex) {

    }
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer/>
        <header>
          <div className="header">
            <div><b>IPL Stats</b></div>
            <div>
              <span style={{fontSize: "18px", color: "grey"}}>Select Season &nbsp;</span>
              <Select value={this.state.selectedOption} onChange={this.handleChange}>
                <MenuItem value={2008}>2008</MenuItem>
                <MenuItem value={2009}>2009</MenuItem>
                <MenuItem value={2010}>2010</MenuItem>
                <MenuItem value={2011}>2011</MenuItem>
                <MenuItem value={2012}>2012</MenuItem>
                <MenuItem value={2013}>2013</MenuItem>
                <MenuItem value={2014}>2014</MenuItem>
                <MenuItem value={2015}>2015</MenuItem>
                <MenuItem value={2016}>2016</MenuItem>
                <MenuItem value={2017}>2017</MenuItem>
              </Select>
            </div>
          </div>
        </header>
        <main className="container">

        </main>
      </React.Fragment>
    );
  }
}

export default App;
