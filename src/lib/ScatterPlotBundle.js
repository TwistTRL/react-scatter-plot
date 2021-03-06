import React, { Component } from "react";
import isEqual from "lodash.isequal";
import { toDomYCoord_Linear, toDomXCoord_Linear } from "./PlottingUtils";
import ScatterPlot from "./ScatterPlot";
import YAxis from "./YAxis";
import PlotAxisGrid from "./PlotAxisGrid";

function round5(x) {
  return Math.ceil(x / 5) * 5;
}

class ScatterPlotBundle extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || this.state !== nextState;
  }

  // TODO: convert x and y to domX and domY
  transformDataSets(dataSets, yAxisKey, xAxisKey) {
    let transformedDataSets = [];

    dataSets.forEach((dataSet) => {
      transformedDataSets.push(
        dataSet.map((data) => {
          return { x: data[xAxisKey], y: data[yAxisKey] };
        })
      );
    });

    return transformedDataSets;
  }

  filterDataSetsToWindow(dataSets, visibleXRange, xAxisKey) {
    return dataSets.map((dataSet) => {
      return dataSet.filter((data) => {
        return (
          data[xAxisKey] >= visibleXRange[0] &&
          data[xAxisKey] <= visibleXRange[1]
        );
      });
    });
  }

  render() {
    const {
      dataSets,
      dataPointColors,
      width,
      height,
      minY,
      maxY,
      xAxisKey,
      yAxisKey,
      configs,
      isRenderPlotOnly,
    } = this.props;

    if (dataSets.length < 1 || dataSets === undefined) {
      return null;
    }

    let { isDynamicXAxis, isDynamicYAxis, yAxisPadding } = configs.axis;
    let visibleYRange = [Number.MAX_VALUE, Number.MIN_VALUE];
    let visibleXRange = isDynamicXAxis
      ? this.props.visibleXRange
      : [Number.MAX_VALUE, Number.MIN_VALUE];
    let visibleYRangeDistance = 0;
    let yAxisPanelWidth = 40;
    let plotWidth = width - yAxisPanelWidth;
    let filteredDataSets = this.filterDataSetsToWindow(
      dataSets,
      visibleXRange,
      xAxisKey
    );
    visibleYRangeDistance = round5(visibleYRange[1] - visibleYRange[0]);
    visibleYRange[0] -=
      yAxisPadding > 0 ? yAxisPadding : visibleYRangeDistance * 0.1; // TODO: figure out y padding
    visibleYRange[1] +=
      yAxisPadding > 0 ? yAxisPadding : visibleYRangeDistance * 0.1;
      console.log(filteredDataSets)
    if (!isRenderPlotOnly) {
      visibleYRange = maxY !== null ? [minY, maxY] : visibleYRange;
      return (
        <table className="chart-table" style={{ borderCollapse: "collapse" }}>
          <tbody>
            <tr className="chart-table-row">
              <td
                className="chart-table-col"
                style={{ width: yAxisPanelWidth }}
              >
                {" "}
                <YAxis
                  canvasW={yAxisPanelWidth}
                  canvasH={height}
                  minY={visibleYRange[0]}
                  maxY={visibleYRange[1]}
                  configs={configs}
                />
              </td>
              <td className="chart-table-col" style={{ width: plotWidth }}>
                {" "}
                <div style={{ position: "absolute" }}>
                  <PlotAxisGrid
                    canvasW={plotWidth}
                    canvasH={height}
                    minY={visibleYRange[0]}
                    maxY={visibleYRange[1]}
                    configs={configs}
                  />
                </div>
                <div style={{ position: "absolute" }}>
                  <ScatterPlot
                    dataSets={filteredDataSets}
                    dataPointColors={dataPointColors}
                    visibleXRange={visibleXRange}
                    visibleYRange={visibleYRange}
                    width={plotWidth}
                    height={height}
                    xAxisKey={xAxisKey}
                    yAxisKey={yAxisKey}
                    configs={configs}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    return (
      <ScatterPlot
        dataSets={dataSets}
        dataPointColors={dataPointColors}
        visibleXRange={visibleXRange}
        visibleYRange={maxY !== null ? [minY, maxY] : visibleYRange}
        width={plotWidth}
        height={height}
        xAxisKey={xAxisKey}
        yAxisKey={yAxisKey}
        configs={configs}
      />
    );
  }
}

export default ScatterPlotBundle;
