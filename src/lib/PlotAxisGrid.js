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
  }

  componentDidMount() {
    this.plotAxisGridCanvas = this.refs.plotAxisGridCanvas;
    this.plotAxisGridCtx = this.plotAxisGridCanvas.getContext("2d");
    this.drawYAxisGrid(this.plotAxisGridCtx);
  }

  componentDidUpdate() {
    this.minY = this.props.minY;
    this.maxY = this.props.maxY;
    this.drawYAxisGrid(this.plotAxisGridCtx);
  }

  generateYAxisLabels(minY, maxY, height, labelPadding, labelTextHeight) {
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

  drawYAxisGrid(ctx) {
   this.generateYAxisLabels(
      this.minY,
      this.maxY,
      this.canvasH,
      20,
      20
    );

    // clear canvas
    ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    ctx.beginPath();
    // y-axis vertical line styling
    ctx.strokeStyle = "rgba(211,211,211, 0.6)";
    ctx.lineWidth = 1;

    for (let i = 0; i < this.yAxisLabels.length; i++) {
      let domY = toDomYCoord_Linear(
        this.canvasH,
        this.minY,
        this.maxY,
        this.yAxisLabels[i]
      );
      ctx.moveTo(0, domY);
      ctx.lineTo(this.canvasW, domY);
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
