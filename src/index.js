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
      visibleXRange: [1492858000000, 1513695600000],
      currentOverlay: null,
      data: [],
      dataPointColors: ["#d50000", "#ff6d00", "#546e7a"]
    };
    this.dataSetCount = 4;
  }

  componentDidMount() {
    let data = [];
    let dataPointColors = [];

    for (let i = 0; i < this.dataSetCount; i++) {
      data[i] = [
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
      data: data,
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
    let { data, visibleXRange, dataPointColors } = this.state;

    return (
      <ScatterPlotBundle
        data={data}
        visibleXRange={[...visibleXRange]}
        width={1200}
        minY={0}
        maxY={200}
        height={400}
        xAxisKey={"time"}
        yAxisKey={"value"}
        dataPointColors={dataPointColors}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
