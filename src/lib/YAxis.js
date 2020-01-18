import React, { Component } from "react";
import { toDomYCoord_Linear, toDomXCoord_Linear } from "./PlottingUtils";
import isEqual from "lodash.isequal";

function round5(x) {
  return Math.round(Math.ceil(x / 5) * 5);
}

function round2(x) {
  return Math.round(Math.ceil(x / 2) * 2);
}

class YAxis extends Component {
  constructor(props) {
    super(props);
    this.canvasW = this.props.canvasW;
    this.canvasH = this.props.canvasH;
    this.minY = this.props.minY;
    this.maxY = this.props.maxY;
    this.yAxisSkipInterval = 50;
  }

  componentDidMount() {
    let yAxisLabelPadding = this.props.configs.axis.yAxisLabelPadding;
    this.generateYAxisLabels(this.maxY * 10);
    this.yAxisCanvas = this.refs.yAxisCanvas;
    this.yAxisCtx = this.yAxisCanvas.getContext("2d");
    this.drawYAxis(
      this.yAxisCtx,
      this.getYAxisLabelSkipInterval(
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
    this.drawYAxis(
      this.yAxisCtx,
      this.getYAxisLabelSkipInterval(
        this.minY,
        this.maxY,
        this.canvasH,
        yAxisLabelPadding,
        20
      )
    );
  }

  toDomYCoord_Linear(height, minY, maxY, dataY) {
    return height - (dataY - minY) / ((maxY - minY) / height);
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

  // TODO: CACHE TEXT CANVAS
  drawYAxis(ctx, yAxisLabelInterval) {
    let textXPadding = 10;
    let yAxisHorizontalLineWidth = 5;

    // clear canvas
    ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    ctx.beginPath();

    // y-axis vertical line styling
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.5;
    // text styling
    ctx.font = "500 13px MuseoSans, sans-serif";
    ctx.lineWidth = 0.6;
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.fillStyle = "gray";

    // draw the y-axis vertical line
    ctx.moveTo(this.canvasW, 5);
    ctx.lineTo(this.canvasW, this.canvasH - 5);
    ctx.stroke();

    // draw the positive labels and horizontal lines
    for (
      let i = 0;
      i < this.maxY + yAxisLabelInterval;
      i += yAxisLabelInterval
    ) {
      if (i % yAxisLabelInterval === 0) {
        let domY = Math.floor(
          this.toDomYCoord_Linear(
            this.canvasH,
            this.minY,
            this.maxY,
            this.yAxisLabels[i]
          )
        );
        ctx.moveTo(this.canvasW - yAxisHorizontalLineWidth, domY);
        ctx.lineTo(this.canvasW, domY);
        ctx.fillText(this.yAxisLabels[i], this.canvasW - textXPadding, domY);
      }
    }

    if (this.minY < 0) {
      for (
        let i = 0;
        i < this.maxY + yAxisLabelInterval;
        i += yAxisLabelInterval
      ) {
        if (i % yAxisLabelInterval === 0 && -this.yAxisLabels[i] >= this.minY) {
          let domY = Math.floor(
            this.toDomYCoord_Linear(
              this.canvasH,
              this.minY,
              this.maxY,
              -this.yAxisLabels[i]
            )
          );
          ctx.moveTo(this.canvasW - yAxisHorizontalLineWidth, domY);
          ctx.lineTo(this.canvasW, domY);
          ctx.fillText(-this.yAxisLabels[i], this.canvasW - textXPadding, domY);
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
        className="plot-y-axis"
        ref="yAxisCanvas"
        width={this.canvasW}
        height={this.canvasH}
      />
    );
  }
}

export default YAxis;
