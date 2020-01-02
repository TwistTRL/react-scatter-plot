import React, { Component } from "react";
import isEqual from "lodash.isequal";
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
      isRenderPlotOnly
    } = this.props;

    if (dataSets.length < 1 || dataSets === undefined) {
      return null;
    }

    let { isDynamicXAxis, isDynamicYAxis, yAxisPadding } = configs.axis;
    let dotSize = configs.plotStyling.dotSize;
    let visibleYRange = [Number.MAX_VALUE, Number.MIN_VALUE];
    let visibleXRange = isDynamicXAxis
      ? this.props.visibleXRange
      : [Number.MAX_VALUE, Number.MIN_VALUE];
    let visibleYRangeDistance = 0;
    let filteredDataSets = [];
    let plotWidth = 1200;
    let yAxisPanelWidth = 40;

    dataSets.forEach((dataSet, i) => {
      filteredDataSets[i] = dataSet.filter(dataObj => {
        if (!isDynamicXAxis) {
          if (dataObj[xAxisKey] < visibleXRange[0]) {
            visibleXRange[0] = dataObj[xAxisKey];
          } else if (dataObj[xAxisKey] > visibleXRange[1]) {
            visibleXRange[1] = dataObj[xAxisKey];
          }
        }

        if (isDynamicYAxis) {
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
          dataObj[xAxisKey] >= visibleXRange[0] &&
          dataObj[xAxisKey] <= visibleXRange[1]
        );
      });
    });

    visibleYRangeDistance = round5(visibleYRange[1] - visibleYRange[0]);
    visibleYRange[0] -=
      yAxisPadding > 0 ? yAxisPadding : visibleYRangeDistance * 0.1; // TODO: figure out y padding
    visibleYRange[1] +=
      yAxisPadding > 0 ? yAxisPadding : visibleYRangeDistance * 0.1;

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
                    width={width}
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
        dataSets={filteredDataSets}
        dataPointColors={dataPointColors}
        visibleXRange={visibleXRange}
        visibleYRange={maxY !== null ? [minY, maxY] : visibleYRange}
        width={width}
        height={height}
        xAxisKey={xAxisKey}
        yAxisKey={yAxisKey}
        configs={configs}
      />
    );
  }
}

export default ScatterPlotBundle;
