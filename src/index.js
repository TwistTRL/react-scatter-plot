import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import ScatterPlotBundle from "./lib";
import PlotInteractionBoxProvider from "./lib/PlotInteraction/PlotInteractionBoxProvider";
import moment from "moment";
import "./index.css";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visibleXRange: [1513058000000, 1513695600000],
      currentOverlay: null,
      dataSets: [],
      dataPointColors: ["#d50000", "#ff6d00", "#546e7a"],
      minY: -200,
      maxY: 200,
      height: 600
    };
    this.prevMaxY = 200;
    this.prevPanDist = 0;
    this.dataSetCount = 4;
    this.handlePan = this.handlePan.bind(this);
    this.handlePanned = this.handlePan.bind(this);
  }

  componentDidMount() {
    let dataSets = [];
    let dataPointColors = [];
    let start = moment(1482858000000);
    let end = moment(1513695600000);

    for (let i = 0; i < this.dataSetCount; i++) {
      dataSets[i] = [
        ...this.generateDummyData(
          [1182858000000, 1513695600000],
          [-this.state.maxY, this.state.maxY],
          100000000
        )
      ];
      dataPointColors[i] = getRandomColor();
    }

    this.setState({
      ...this.state,
      dataSets: dataSets,
      dataPointColors: dataPointColors
    });

    console.log(dataSets)
  }

  generateDummyData(xRange, yRange, dataFreq) {
    let dummyData = [];

    for (let curX = xRange[0]; curX < xRange[1]; curX += dataFreq) {
      dummyData.push({
        time: curX,
        value: randomInteger(yRange[0], yRange[1])
      });
    }

    return dummyData;
  }

  handlePan(e) {
    let newMaxY =
      this.state.maxY + (e.end.domY - e.start.domY - this.prevPanDist);

    if (newMaxY > 150) {
      this.setState({
        ...this.state,
        maxY: this.state.maxY + (e.end.domY - e.start.domY - this.prevPanDist)
      });
      this.prevPanDist = e.end.domY - e.start.domY;
    }
  }

  handlePanned() {
    this.prevPanDist = 0;
  }

  render() {
    let { dataSets, visibleXRange, dataPointColors, minY, maxY, height } = this.state;
    let configs = {
      axis: {
        isDynamicYAxis: true, // dynamic y axis = scale y axis according to current visible dataSets points
        isDynamicXAxis: true, // dynamic x axis = use x axis passed in by the plot user
        yAxisLabelPadding: 20,
        xAxisPadding: 0
      },
      plotStyling: {
        dotSize: 10
      }
    };

    return (
      <>
        <div style={{ position: "absolute", cursor: "ns-resize" }}>
          <PlotInteractionBoxProvider
            width={40}
            height={height}
            handlePan={this.handlePan}
            handlePanned={this.handlePanned}
            render={() => {}}
          />
        </div>
        <ScatterPlotBundle
          dataSets={dataSets}
          visibleXRange={visibleXRange}
          minY={minY}
          maxY={maxY}
          width={1500}
          height={height}
          xAxisKey={"time"}
          yAxisKey={"value"}
          dataPointColors={dataPointColors}
          isRenderPlotOnly={false}
          configs={configs}
        />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
