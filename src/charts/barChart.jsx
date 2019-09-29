import React, {Component} from "react";
import { BarChart } from "react-d3-components";

class BarChartContainer extends Component {
  state = {}

  tooltip (x, y0, y, total) {
    return y.toString();
  };

  render() {
    const {data} = this.props

    return (
      <BarChart
        data={data}
        width={800}
        height={400}
        margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
        tooltipHtml={this.tooltip}
        colorByLabel={false}
      />
    );
  }
}

export default BarChartContainer;
