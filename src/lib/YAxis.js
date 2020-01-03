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
  }

  componentDidMount() {
    this.yAxisCanvas = this.refs.yAxisCanvas;
    this.yAxisCtx = this.yAxisCanvas.getContext("2d");
    this.drawYAxis(this.yAxisCtx);
  }

  componentDidUpdate() {
    this.minY = this.props.minY;
    this.maxY = this.props.maxY;
    this.drawYAxis(this.yAxisCtx);
  }

  toDomYCoord_Linear = (height, minY, maxY, dataY) => {
    return height - (dataY - minY) / ((maxY - minY) / height);
  };

  generateYAxisLabels(minY, maxY, height, labelPadding = 20, labelTextHeight) {
    this.yAxisLabels = [];
    let numOfLabelsCanFit = Math.round(
      height / (labelTextHeight + labelPadding)
    );
    let yAxisSpan = round5(maxY - minY);
    let yAxisLabelInterval = round5(yAxisSpan / numOfLabelsCanFit);

    // negative labels
    for (
      let curYAxisLabel = -yAxisLabelInterval;
      curYAxisLabel > round5(minY);
      curYAxisLabel -= yAxisLabelInterval
    ) {
      this.yAxisLabels.push(curYAxisLabel);
    }

    // positive labels
    for (
      let curYAxisLabel = 0;
      curYAxisLabel < round5(maxY);
      curYAxisLabel += yAxisLabelInterval
    ) {
      this.yAxisLabels.push(curYAxisLabel);
    }
  }

  drawYAxis = ctx => {
    let textXPadding = 10;
    let yAxisHorizontalLineWidth = 5;
    let yAxisLabelPadding = this.props.configs.axis.yAxisLabelPadding;
    this.generateYAxisLabels(
      this.minY,
      this.maxY,
      this.canvasH,
      yAxisLabelPadding,
      20
    );

    // clear canvas
    ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    ctx.beginPath();

    // y-axis vertical line styling
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.5;
    // text styling
    ctx.font = "500 13px Museo Sans, sans-serif";
    ctx.lineWidth = 0.6;
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.fillStyle = "gray";

    // draw the y-axis vertical line
    ctx.moveTo(this.canvasW, 5);
    ctx.lineTo(this.canvasW, this.canvasH - 5);
    ctx.stroke();

    // draw the labels and horizontal lines
    for (let i = 0; i < this.yAxisLabels.length; i++) {
      let domY = this.toDomYCoord_Linear(
        this.canvasH,
        this.minY,
        this.maxY,
        this.yAxisLabels[i]
      );
      ctx.moveTo(this.canvasW - yAxisHorizontalLineWidth, domY);
      ctx.lineTo(this.canvasW, domY);
      ctx.fillText(this.yAxisLabels[i], this.canvasW - textXPadding, domY);
    }

    ctx.stroke();
  };

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
