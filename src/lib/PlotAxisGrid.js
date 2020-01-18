import React, { Component } from "react";
import { toDomYCoord_Linear, toDomXCoord_Linear } from "./PlottingUtils";
import isEqual from "lodash.isequal";

function round5(x) {
  return Math.round(Math.ceil(x / 5) * 5);
}

class PlotAxisGrid extends Component {
  constructor(props) {
    super(props);
    this.canvasW = this.props.canvasW;
    this.canvasH = this.props.canvasH;
    this.minY = this.props.minY;
    this.maxY = this.props.maxY;
    this.horiGridLineCache = undefined;
  }

  componentDidMount() {
    this.plotAxisGridCanvas = this.refs.plotAxisGridCanvas;
    this.plotAxisGridCtx = this.plotAxisGridCanvas.getContext("2d");

    // y-axis vertical line styling
    this.plotAxisGridCtx.strokeStyle = "rgba(211,211,211, 0.6)";
    this.plotAxisGridCtx.lineWidth = 1;

    this.yAxisIntervals = this.generateYAxisLabels(this.maxY * 10);
    this.horiGridLineCache = this.getHoriLineCanvas();
    this.drawYAxisGrid(
      this.plotAxisGridCtx,
      this.getYAxisLabelSkipInterval(
        this.minY,
        this.maxY,
        this.canvasH,
        this.yAxisLabelPadding,
        20
      )
    );
  }

  componentDidUpdate() {
    this.minY = this.props.minY;
    this.maxY = this.props.maxY;
    this.drawYAxisGrid(
      this.plotAxisGridCtx,
      this.getYAxisLabelSkipInterval(
        this.minY,
        this.maxY,
        this.canvasH,
        this.yAxisLabelPadding,
        20
      )
    );
  }

  generateYAxisLabels(maxY) {
    let yAxisLabels = [];
    let yAxisLabelInterval = 1;

    for (
      let curYAxisLabel = 0;
      curYAxisLabel < round5(maxY);
      curYAxisLabel += yAxisLabelInterval
    ) {
      yAxisLabels.push(curYAxisLabel);
    }

    return yAxisLabels;
  }

  getYAxisLabelSkipInterval(
    minY,
    maxY,
    height,
    labelPadding = 20,
    labelTextHeight
  ) {
    let numOfLabelsCanFit = Math.round(
      height / (labelTextHeight + labelPadding)
    );

    return round5((maxY - minY) / numOfLabelsCanFit);
  }

  drawYAxisGrid(ctx, yAxisIntervals) {
    // clear canvas
    ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    ctx.beginPath();

    for (let i = 0; i < this.maxY; i += yAxisIntervals) {
      let domY = Math.floor(
        toDomYCoord_Linear(
          this.canvasH,
          this.minY,
          this.maxY,
          this.yAxisIntervals[i]
        )
      );
      // ctx.moveTo(0, domY);
      // ctx.lineTo(this.canvasW, domY);
      ctx.drawImage(this.horiGridLineCache, 0, domY);
    }

    if (this.minY < 0) {
      for (let i = 0; i < this.maxY; i += yAxisIntervals) {
        let domY = Math.floor(
          toDomYCoord_Linear(
            this.canvasH,
            this.minY,
            this.maxY,
            -this.yAxisIntervals[i]
          )
        );
        // ctx.moveTo(0, domY);
        // ctx.lineTo(this.canvasW, domY);
        ctx.drawImage(this.horiGridLineCache, 0, domY);
      }
    }

    ctx.stroke();
  }

  getHoriLineCanvas() {
    let cachedHoriLineCanvas = this.cachedHoriLineCanvas;

    if (cachedHoriLineCanvas === undefined) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = this.canvasW;
      canvas.height = 1;

      // text styling
      ctx.moveTo(0, 0);
      ctx.lineTo(canvas.width, 0);
      ctx.stroke();
      cachedHoriLineCanvas = canvas;
    }

    return cachedHoriLineCanvas;
  }

  render() {
    // width, height, data from props
    // reserve className for parent
    return (
      <canvas
        className="plot-axis-grid"
        ref="plotAxisGridCanvas"
        width={this.canvasW}
        height={this.canvasH}
      />
    );
  }
}

export default PlotAxisGrid;
