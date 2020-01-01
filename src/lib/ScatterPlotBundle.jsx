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
      dtWindow,
      width,
      height,
      minY,
      maxY,
      xAxisKey,
      yAxisKey
    } = this.props;
    // let filteredData = data.filter(hr => {
    //   return hr[xAxisKey] >= dtWindow[0] && hr[xAxisKey] <= dtWindow[1];
    // });
    if (data.length < 1 || data === undefined) {
      return null;
    }

    let filteredData = [];
    data.forEach((dataArr, i) => {
      filteredData[i] = dataArr.filter(d => {
        return d[xAxisKey] >= dtWindow[0] && d[xAxisKey] <= dtWindow[1];
      });
    });
 
    return (
      <ScatterPlot
        data={filteredData}
        dataPointColors={dataPointColors}
        dtWindow={dtWindow}
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
