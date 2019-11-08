import React, { PureComponent } from "react";
import {
    toDomYCoord_Linear,
    toDomXCoord_Linear,
    fromDomXCoord_Linear
} from "./PlottingUtils"

class ScatterPlot extends PureComponent {
    constructor(props) {
        super(props);
        this.canvasW = this.props.width
        this.canvasH = this.props.height
    }

    componentDidMount() {
        this.scatterPlotCanvas = this.refs.scatterPlotCanvas
        this.scatterPlotCtx = this.scatterPlotCanvas.getContext("2d")
        this.drawLinePlot(this.scatterPlotCtx)
    }

    componentDidUpdate() {
        this.drawLinePlot(this.scatterPlotCtx)
    }

    roundRect(ctx, x0, y0, x1, y1, r, color) {
        var w = x1 - x0;
        var h = y1 - y0;

        if (r > w / 2) r = w / 2;
        if (r > h / 2) r = h / 2;

        ctx.beginPath();
        ctx.moveTo(x1 - r, y0)
        ctx.quadraticCurveTo(x1, y0, x1, y0 + r)
        ctx.lineTo(x1, y1 - r)
        ctx.quadraticCurveTo(x1, y1, x1 - r, y1)
        ctx.lineTo(x0 + r, y1)
        ctx.quadraticCurveTo(x0, y1, x0, y1 - r)
        ctx.lineTo(x0, y0 + r)
        ctx.quadraticCurveTo(x0, y0, x0 + r, y0)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
    }

    drawLinePlot = (ctx) => {
        let { data, dtWindow } = this.props

        ctx.clearRect(0, 0, this.canvasW, this.canvasH)
        ctx.beginPath()
        data.map((d, i) => {
            let domY, domX = toDomXCoord_Linear(this.canvasW, dtWindow[0], dtWindow[1], d["time"])
            domY = toDomYCoord_Linear(this.canvasH, 0, 200, d["value"])

            if (i === 0) {
                ctx.moveTo(domX, domY)
            } else {
                ctx.lineTo(domX, domY)
            }
        })
        ctx.stroke()
    }

    drawScatterPlot = (ctx) => {
        let { data, dtWindow } = this.props

        ctx.clearRect(0, 0, this.canvasW, this.canvasH)
        data.map(d => {
            let domY, domX = toDomXCoord_Linear(this.canvasW, dtWindow[0], dtWindow[1], d["time"])

            let circle = this.getCircle("green");

            domY = toDomYCoord_Linear(this.canvasH, 0, 200, d["value"])

            ctx.drawImage(circle, domX, domY);
        })
    }

    getCircle(color) {
        if (color === "green") {
            if (!this.greenCircle) {
                let canvas = document.createElement("canvas");
                canvas.width = 6;
                canvas.height = 6;
                let ctx = canvas.getContext("2d");
                ctx.arc(3, 3, 2, 0, 2 * Math.PI);
                ctx.fillStyle = '#c8cad1'
                ctx.fill();
                this.greenCircle = canvas;
            }
            return this.greenCircle;
        } else if (color === "black") {
            if (!this.blackCircle) {
                let canvas = document.createElement("canvas");
                canvas.width = 6;
                canvas.height = 6;
                let ctx = canvas.getContext("2d");
                ctx.arc(3, 3, 2, 0, 2 * Math.PI);
                ctx.fillStyle = '#727272'
                ctx.fill();
                this.blackCircle = canvas;
            }
            return this.blackCircle;
        } else {
            if (!this.redCircle) {
                let canvas = document.createElement("canvas");
                canvas.width = 6;
                canvas.height = 6;
                let ctx = canvas.getContext("2d");
                ctx.arc(3, 3, 2, 0, 2 * Math.PI);
                ctx.fillStyle = '#cc7766'
                ctx.fill();
                this.redCircle = canvas;
            }
            return this.redCircle;
        }
    }

    render() {
        const styles = {
            scatterPlotCanvas: {
                position: "absolute"
            }
        }
        return (
            <canvas
                className="scatter-plot-canvas"
                ref="scatterPlotCanvas"
                width={this.canvasW}
                height={this.canvasH}
                style={styles.scatterPlotCanvas}
            />
        )
    }
}

export default ScatterPlot