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
    let batting_percentage = {}

    if (data) {
      console.log(data)
      winners = [{
        label: "Top Winners",
        values: data.winners.slice(0, 4)
      }]

      toss_winners = {
        label: "Top Toss Winners",
        values: data.toss_winners
      }

      batting_percentage = {
        label: "Batting percentage",
        values: data.toss_winners_decision
      }
    }

    return (
      <React.Fragment>
        <ToastContainer/>
        <header>
          <div className="header">
            <div><b>IPL Stats</b></div>
            <div>
              <span style={{
                fontSize: "18px",
                color: "grey"
              }}>Select Season &nbsp;</span>
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
            <BarChartContainer data={winners}/>
          </div>

          <div className="chartArea">
            <h4>Top Toss Winners</h4>
            <PieChartContainer data={toss_winners}/>
          </div>

          <div className="chartArea">
            <h4>Batting percentage after toss win</h4>
            <PieChartContainer data={batting_percentage}/>
          </div>

          <div className="chartArea">
            <table>
              <tbody>
              <tr>
                <td>Team won by highest no of wickets</td>
                <td>{data.wicket_winners[0].winner}</td>
              </tr>

              <tr>
                <td>Most toss winning team</td>
                <td>{data.toss_winners[0].x}</td>
              </tr>

              {/*<tr>*/}
              {/*  <td>Percentage of teams decided to bat after winning toss</td>*/}
              {/*  <td>{data.toss_winners_decision[0].percentage_bat}</td>*/}
              {/*</tr>*/}

              <tr>
                <td>Team with most toss and match winner</td>
                <td>{data.toss_and_match_winners[0].x}</td>
              </tr>

              <tr>
                <td>Most match winning team</td>
                <td>{data.winners[0].x}</td>
              </tr>

              <tr>
                <td>Highest margin winner team</td>
                <td>{data.run_winners[0].winner}</td>
              </tr>

              <tr>
                <td>Player with most man of the match</td>
                <td>{data.players_of_match[0].player_of_match}</td>
              </tr>

              <tr>
                <td>Location with most win for top team</td>
                <td>{data.most_win_location[0].city}</td>
              </tr>

              <tr>
                <td>Most run giving bowler</td>
                <td>{data.most_runs_given[0].bowler}</td>
              </tr>

              <tr>
                <td>Most catches taken</td>
                <td>{data.most_catches_taken[0].fielder}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </main>
        }
      </React.Fragment>
    );
  }
}

export default App;
