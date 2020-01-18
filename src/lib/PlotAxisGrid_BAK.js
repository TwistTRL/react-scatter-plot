import React, { Component } from "react";
import { toDomYCoord_Linear, toDomXCoord_Linear } from "./PlottingUtils";
import isEqual from "lodash.isequal";

function round5(x) {
  return Math.round(Math.ceil(x / 5) * 5);
}

function round2(x) {
  return Math.round(Math.ceil(x / 2) * 2);
}

class PlotAxisGrid extends Component {
  constructor(props) {
    super(props);
    this.canvasW = this.props.canvasW;
    this.canvasH = this.props.canvasH;
    this.minY = this.props.minY;
    this.maxY = this.props.maxY;
    console.log(this.canvasW);
  }

  componentDidMount() {
    let yAxisLabelPadding = this.props.configs.axis.yAxisLabelPadding;
    this.plotAxisGridCanvas = this.refs.plotAxisGridCanvas;
    this.plotAxisGridCtx = this.plotAxisGridCanvas.getContext("2d");

    let canvas = document.createElement("canvas");
    canvas.width = this.canvasW;
    canvas.height = 1;
    let ctx = canvas.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.lineTo(0, this.canvasW);
    ctx.stroke();
    this.cachedGridLine = canvas;

    this.generateYAxisLabels(this.maxY * 1.5);
    this.drawYAxisGrid(
      this.plotAxisGridCtx,
      this.getYAxisSkipInterval(
        this.minY,
        this.maxY,
        this.canvasH,
        yAxisLabelPadding,
        20
      )
    );
  }

  componentDidUpdate() {
    let yAxisLabelPadding = this.props.configs.axis.yAxisLabelPadding;
    this.minY = this.props.minY;
    this.maxY = this.props.maxY;
    this.drawYAxisGrid(
      this.plotAxisGridCtx,
      this.getYAxisSkipInterval(
        this.minY,
        this.maxY,
        this.canvasH,
        yAxisLabelPadding,
        20
      )
    );
  }

  getYAxisSkipInterval(minY, maxY, height, labelPadding = 20, labelTextHeight) {
    let numOfLabelsCanFit = Math.round(
      height / (labelTextHeight + labelPadding)
    );

    return round5((maxY - minY) / numOfLabelsCanFit);
  }

  generateYAxisLabels(maxY) {
    this.yAxisLabels = [];
    let yAxisLabelInterval = 1;

    for (
      let curYAxisLabel = 0;
      curYAxisLabel < round5(maxY);
      curYAxisLabel += yAxisLabelInterval
    ) {
      this.yAxisLabels.push(curYAxisLabel);
    }
  }

  drawYAxisGrid(ctx, yAxisSkipInterval) {
    // clear canvas
    ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    ctx.beginPath();
    // y-axis vertical line styling
    ctx.strokeStyle = "rgba(211,211,211, 0.6)";
    ctx.lineWidth = 1;

    for (let i = 0; i < this.yAxisLabels.length; i++) {
      if (i % yAxisSkipInterval === 0) {
        let domY = toDomYCoord_Linear(
          this.canvasH,
          this.minY,
          this.maxY,
          this.yAxisLabels[i]
        );
        ctx.moveTo(0, domY);
        ctx.lineTo(this.canvasW, domY);
        // ctx.drawImage(this.cachedGridLine, 0, domY);
      }
    }

    if (this.minY < 0) {
      for (let i = 0; i < this.yAxisLabels.length; i++) {
        if (i % yAxisSkipInterval === 0) {
          let domY = toDomYCoord_Linear(
            this.canvasH,
            this.minY,
            this.maxY,
            -this.yAxisLabels[i]
          );
          ctx.moveTo(0, domY);
          ctx.lineTo(this.canvasW, domY);
        }
      }
    }

    ctx.stroke();
  }

  roundToNearestTenth(n) {
    return (parseInt(n / 10, 10) + 1) * 10;
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
