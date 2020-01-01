import React, { Component } from "react";
import ScatterPlot from "./ScatterPlot";
import isEqual from "lodash.isequal";

class ScatterPlotBundle extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || this.state !== nextState;
  }

  render() {
    const {
      data,
      dataPointColors,
      visibleXRange,
      width,
      height,
      minY,
      maxY,
      xAxisKey,
      yAxisKey
    } = this.props;

    if (data.length < 1 || data === undefined) {
      return null;
    }

    let filteredData = [];
    data.forEach((dataArr, i) => {
      filteredData[i] = dataArr.filter(d => {
        return d[xAxisKey] >= visibleXRange[0] && d[xAxisKey] <= visibleXRange[1];
      });
    });

    return (
      <ScatterPlot
        data={filteredData}
        dataPointColors={dataPointColors}
        visibleXRange={visibleXRange}
        width={width}
        height={height}
        minY={minY}
        maxY={maxY}
        xAxisKey={xAxisKey}
        yAxisKey={yAxisKey}
      />
    );
  }
}

export default ScatterPlotBundle;
