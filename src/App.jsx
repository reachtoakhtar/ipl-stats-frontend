import React, {Component} from "react";
import {ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {getStats} from "./services/statService";
import BarChartContainer from "./charts/barChart";
import PieChartContainer from "./charts/pieChart";

class App extends Component {
  state = {
    selectedOption: '2008',
    data: null
  };

  componentWillMount() {
    this.state.selectedOption = "2008";
    this.getData(this.state.selectedOption);
  }

  handleChange = (event) => {
    const selectedOption = event.target.value;
    this.setState({selectedOption})
    this.getData(selectedOption);
  };

  async getData(season) {
    try {
      const {data} = await getStats(season)
      this.setState({data})
    } catch (ex) {

    }
  }

  render() {
    const selectedOption = this.state.selectedOption
    const data = this.state.data
    let winners = []
    let toss_winners = {}

    if (data) {
      winners = [{
        label: "Top Winners",
        values: data.winners.slice(0, 4)
      }]

      toss_winners = {
        label: "Top Toss Winners",
        values: data.toss_winners.slice(0, 4)
      }

    }

    return (
      <React.Fragment>
        <ToastContainer/>
        <header>
          <div className="header">
            <div><b>IPL Stats</b></div>
            <div>
              <span style={{fontSize: "18px", color: "grey"}}>Select Season &nbsp;</span>
              <Select value={selectedOption} onChange={this.handleChange}>
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
        {data &&
        <main className="container">
          <div className="chartArea">
            <h4>Top Match Winners</h4>
            <BarChartContainer data={winners} />
          </div>

          <div className="chartArea">
            <h4>Top Toss Winners</h4>
            <PieChartContainer data={toss_winners}/>
          </div>

          {/*<div className="chartArea">*/}
          {/*  <table>*/}
          {/*    <tr>*/}
          {/*      <td>Max palyer of the match award in the season</td>*/}
          {/*      <td>{players_of_match}</td>*/}
          {/*    </tr>*/}
          {/*  </table>*/}
          {/*  <label>Top Toss Winners</label>: <span>{}</span>*/}
          {/*</div>*/}

        </main>
        }
      </React.Fragment>
    );
  }
}

export default App;
