import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import ScatterPlotBundle from "./lib";

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
      visibleXRange: [1512858000000, 1513695600000],
      currentOverlay: null,
      dataSets: [],
      dataPointColors: ["#d50000", "#ff6d00", "#546e7a"]
    };
    this.dataSetCount = 4;
  }

  componentDidMount() {
    let dataSets = [];
    let dataPointColors = [];

    for (let i = 0; i < this.dataSetCount; i++) {
      dataSets[i] = [
        ...this.generateDummyData(
          [1482858000000, 1513695600000],
          [1, 200],
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
  }

  generateDummyData = (xRange, yRange, dataFreq) => {
    let dummyData = [];

    for (let curX = xRange[0]; curX < xRange[1]; curX += dataFreq) {
      dummyData.push({
        time: curX,
        value: randomInteger(yRange[0], yRange[1])
      });
    }

    return dummyData;
  };

  render() {
    let { dataSets, visibleXRange, dataPointColors } = this.state;
    let configs = {
      legends: {
        isDynamicYAxis: true, // dynamic y axis = scale y axis according to current visible dataSets points
        isDynamicXAxis: true // dynamic x axis = use x axis passed in by the plot user
      }
    };

    return (
      <ScatterPlotBundle
        dataSets={dataSets}
        visibleXRange={[...visibleXRange]}
        width={1200}
        height={400}
        xAxisKey={"time"}
        yAxisKey={"value"}
        dataPointColors={dataPointColors}
        configs={configs}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
