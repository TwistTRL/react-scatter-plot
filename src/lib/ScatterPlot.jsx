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

  roundRect(ctx, x0, y0, x1, y1, r, color) {
    var w = x1 - x0;
    var h = y1 - y0;
    if (r > w / 2) r = w / 2;
    if (r > h / 2) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x1 - r, y0);
    ctx.quadraticCurveTo(x1, y0, x1, y0 + r);
    ctx.lineTo(x1, y1 - r);
    ctx.quadraticCurveTo(x1, y1, x1 - r, y1);
    ctx.lineTo(x0 + r, y1);
    ctx.quadraticCurveTo(x0, y1, x0, y1 - r);
    ctx.lineTo(x0, y0 + r);
    ctx.quadraticCurveTo(x0, y0, x0 + r, y0);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  drawScatterPlot = ctx => {
    let {
      data,
      dataPointColors,
      dtWindow,
      minY,
      maxY,
      xAxisKey,
      yAxisKey
    } = this.props;

    if (data === undefined) {
      return;
    }

    ctx.clearRect(0, 0, this.canvasW, this.canvasH);

    data.forEach((dataArr, i) => {
      if (dataArr.length > 0) {
        dataArr.forEach(d => {
          let domY,
            domX = toDomXCoord_Linear(
              this.canvasW,
              dtWindow[0],
              dtWindow[1],
              d[xAxisKey]
            );

          let circle = this.getCircle(dataPointColors[i]);

          domY = toDomYCoord_Linear(this.canvasH, minY, maxY, d[yAxisKey]);

          ctx.drawImage(circle, domX, domY);
        });
      }
    });
  };

  getCircle(color) {
    if (this.dataPointColorCanvasCache[color] === undefined) {
      let canvas = document.createElement("canvas");
      canvas.width = 6;
      canvas.height = 6;
      let ctx = canvas.getContext("2d");
      ctx.arc(3, 3, 2, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      this.dataPointColorCanvasCache[color] = canvas;
    }
    return this.dataPointColorCanvasCache[color];
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
