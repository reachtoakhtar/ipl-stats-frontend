import React, {Component} from "react";
import { PieChart } from "react-d3-components";


class PieChartContainer extends Component {
  state = {}

  tooltip (x, y) {
    return y.toString();
  };

  render() {
    console.log(this.props)
    const Chartata = this.props.data

    return (
      <PieChart
        data={Chartata}
        width={700}
        height={400}
        margin={{top: 10, bottom: 10, left: 100, right: 100}}
        tooltipOffset={{top: 175, left: 200}}
        tooltipHtml={this.tooltip}
        tooltipMode={'fixed'}
        sort={null}
      />
  );
  }
}

export default PieChartContainer;
