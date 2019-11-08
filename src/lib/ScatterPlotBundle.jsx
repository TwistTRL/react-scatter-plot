import React, { PureComponent } from "react";
import ScatterPlot from "./ScatterPlot"

class ScatterPlotBundle extends PureComponent {

    filterDataToFitDtWindow = (data, minX, maxX) => {
        let minIndex = 0, maxIndex = 0
        let filteredData = data

        filteredData.array.forEach((d, i) => {
            if (d.time <= minX) {
                if (d.time < minX) {
                    if (i > 0) {
                        minIndex = i - 1
                    } else {
                        minIndex = i
                    }
                } else {
                    minIndex = i
                }
            }

            // only take the first maxX
            if (d.time >= maxX && maxIndex === 0) {
                maxIndex = i
            }
        })

        if (maxIndex === 0) {
            maxIndex = filteredData.length - 1
        }

        return filteredData.slice(minIndex, maxIndex)
    }

    render() {
        const { data, dtWindow, width, height } = this.props

        let filteredData = data.filter(hr => {
            return hr["time"] >= dtWindow[0] && hr["time"] <= dtWindow[1]
        })

        return (
            <div className="scatter-plot-wrap" style={{ position: "absolute" }}>
                <ScatterPlot
                    data={filteredData}
                    dtWindow={dtWindow}
                    width={width}
                    height={height} />
                {this.props.currentOverlay ? this.props.render(filteredData) : null}
            </div>
        )
    }
}

export default ScatterPlotBundle