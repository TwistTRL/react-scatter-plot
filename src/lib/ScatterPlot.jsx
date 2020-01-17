import React, { Component } from "react";
import isEqual from "lodash.isequal";
import { toDomYCoord_Linear, toDomXCoord_Linear } from "./PlottingUtils";

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.canvasW = this.props.width;
    this.canvasH = this.props.height;
    // {color: canvas}
    this.dataPointColorCanvasCache = {};
    this.dotCanvasSize = 6;
  }

  componentDidMount() {
    this.scatterPlotCanvas = this.refs.scatterPlotCanvas;
    this.scatterPlotCtx = this.scatterPlotCanvas.getContext("2d");
    this.drawScatterPlot(this.scatterPlotCtx);
  }

  componentDidUpdate(prevProps, prevState) {
    this.drawScatterPlot(this.scatterPlotCtx);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || this.state !== nextState;
  }

  drawScatterPlot(ctx) {
    let {
      dataSets,
      dataPointColors,
      visibleXRange,
      visibleYRange,
      xAxisKey,
      yAxisKey,
      configs
    } = this.props;

    if (dataSets === undefined) {
      return;
    }

    let dotCanvasSize =
      configs.plotStyling.dotSize > 0
        ? configs.plotStyling.dotSize
        : this.dotCanvasSize;

    ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    ctx.beginPath();

    for (let i = 0; i < dataSets.length; i++) {
      let curDataSet = dataSets[i];
      if (curDataSet.length > 0) {
        for (let j = 0; j < curDataSet.length; j++) {
          let curDataObj = curDataSet[j];
          if (
            curDataObj[xAxisKey] >= visibleXRange[0] &&
            curDataObj[xAxisKey] <= visibleXRange[1]
          ) {
            let domY,
              domX =
                toDomXCoord_Linear(
                  this.canvasW,
                  visibleXRange[0],
                  visibleXRange[1],
                  curDataObj[xAxisKey]
                ) -
                dotCanvasSize / 2;

            let circle = this.getCircle(dataPointColors[i], dotCanvasSize);

            domY =
              toDomYCoord_Linear(
                this.canvasH,
                visibleYRange[0],
                visibleYRange[1],
                curDataObj[yAxisKey]
              ) -
              dotCanvasSize / 2;

            ctx.drawImage(circle, domX, domY);
          }
        }
      }
    }
  }

  getCircle(color, size = 6) {
    let cachedDataPointColorCanvas = this.dataPointColorCanvasCache[
      color + size
    ];

    if (cachedDataPointColorCanvas === undefined) {
      let canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      let ctx = canvas.getContext("2d");
      ctx.arc(size / 2, size / 2, size / 3, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      cachedDataPointColorCanvas = canvas;
    }
    return cachedDataPointColorCanvas;
  }

  render() {
    const styles = {
      scatterPlotCanvas: {
        position: "absolute"
      }
    };

    return (
      <canvas
        className="scatter-plot-canvas"
        ref="scatterPlotCanvas"
        width={this.canvasW}
        height={this.canvasH}
        style={styles.scatterPlotCanvas}
      />
    );
  }
}

export default ScatterPlot;
