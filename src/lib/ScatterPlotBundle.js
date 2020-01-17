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
    let visibleYRange = [Number.MAX_VALUE, Number.MIN_VALUE];
    let visibleXRange = isDynamicXAxis
      ? this.props.visibleXRange
      : [Number.MAX_VALUE, Number.MIN_VALUE];
    let visibleYRangeDistance = 0;
    let plotWidth = 1200;
    let yAxisPanelWidth = 40;

    if (
      (this.prevMinx !== this.props.visibleXRange[0] ||
        this.prevMaxX !== this.props.visibleXRange[1]) &&
      isDynamicXAxis
    ) {
      this.prevMinx = this.props.visibleXRange[0];
      this.prevMaxX = this.props.visibleXRange[1];

      // for (let i = 0; i < dataSets.length; i++) {
      //   let curDataSet = dataSets[i];
      //   for (let j = 0; j < curDataSet.length; j++) {
      //     let curDataObj = curDataSet[j];
      //     if (!isDynamicXAxis) {
      //       if (curDataObj[xAxisKey] < visibleXRange[0]) {
      //         visibleXRange[0] = curDataObj[xAxisKey];
      //       } else if (curDataObj[xAxisKey] > visibleXRange[1]) {
      //         visibleXRange[1] = curDataObj[xAxisKey];
      //       }
      //     }

      //     if (isDynamicYAxis) {
      //       if (
      //         curDataObj[xAxisKey] >= visibleXRange[0] &&
      //         curDataObj[xAxisKey] <= visibleXRange[1]
      //       ) {
      //         if (curDataObj[yAxisKey] < visibleYRange[0]) {
      //           visibleYRange[0] = curDataObj[yAxisKey];
      //         } else if (curDataObj[yAxisKey] > visibleYRange[1]) {
      //           visibleYRange[1] = curDataObj[yAxisKey];
      //         }
      //       }
      //     } else {
      //       if (curDataObj[yAxisKey] < visibleYRange[0]) {
      //         visibleYRange[0] = curDataObj[yAxisKey];
      //       } else if (curDataObj[yAxisKey] > visibleYRange[1]) {
      //         visibleYRange[1] = curDataObj[yAxisKey];
      //       }
      //     }
      //   }
      // }
    }

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
                    dataSets={dataSets}
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
        dataSets={dataSets}
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
