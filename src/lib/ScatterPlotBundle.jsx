import React, { Component } from "react";
import ScatterPlot from "./ScatterPlot";
import isEqual from "lodash.isequal";

class ScatterPlotBundle extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || this.state !== nextState;
  }

  render() {
    const {
      dataSets,
      dataPointColors,
      width,
      height,
      xAxisKey,
      yAxisKey,
      configs
    } = this.props;

    if (dataSets.length < 1 || dataSets === undefined) {
      return null;
    }
    let visibleYRange = [Number.MAX_VALUE, Number.MIN_VALUE];
    let visibleXRange = configs.legends.isDynamicXAxis
      ? this.props.visibleXRange
      : [Number.MAX_VALUE, Number.MIN_VALUE];
    let filteredDataSets = [];

    dataSets.forEach((dataSet, i) => {
      filteredDataSets[i] = dataSet.filter(dataObj => {
        if (!configs.legends.isDynamicXAxis) {
          if (dataObj[xAxisKey] < visibleXRange[0]) {
            visibleXRange[0] = dataObj[xAxisKey];
          } else if (dataObj[xAxisKey] > visibleXRange[1]) {
            visibleXRange[1] = dataObj[xAxisKey];
          }
        }

        if (configs.legends.isDynamicYAxis) {
          if (
            dataObj[xAxisKey] >= visibleXRange[0] &&
            dataObj[xAxisKey] <= visibleXRange[1]
          ) {
            if (dataObj[yAxisKey] < visibleYRange[0]) {
              visibleYRange[0] = dataObj[yAxisKey];
            } else if (dataObj[yAxisKey] > visibleYRange[1]) {
              visibleYRange[1] = dataObj[yAxisKey];
            }
          }
        } else {
          if (dataObj[yAxisKey] < visibleYRange[0]) {
            visibleYRange[0] = dataObj[yAxisKey];
          } else if (dataObj[yAxisKey] > visibleYRange[1]) {
            visibleYRange[1] = dataObj[yAxisKey];
          }
        }

        return (
          dataObj[xAxisKey] >= visibleXRange[0] && dataObj[xAxisKey] <= visibleXRange[1]
        );
      });
    });

    console.log(visibleXRange, visibleYRange)

    return (
      <ScatterPlot
        dataSets={filteredDataSets}
        dataPointColors={dataPointColors}
        visibleXRange={visibleXRange}
        visibleYRange={visibleYRange}
        width={width}
        height={height}
        xAxisKey={xAxisKey}
        yAxisKey={yAxisKey}
      />
    );
  }
}

export default ScatterPlotBundle;
