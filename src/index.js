import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import ScatterPlotBundle from "./lib";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dtWindow: [1492858000000, 1513695600000],
      currentOverlay: null,
      data: []
    };
  }

  componentDidMount() {
    let data = [
      [
        ...this.generateDummyData(
          [1482858000000, 1513695600000],
          [1, 200],
          100000000
        )
      ],
      [
        ...this.generateDummyData(
          [1482858000000, 1513695600000],
          [1, 200],
          100000000
        )
      ]
    ];

    this.setState({
      ...this.state,
      data: data
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
    return (
      <ScatterPlotBundle
        data={this.state.data}
        dtWindow={[...this.state.dtWindow]}
        width={1200}
        minY={0}
        maxY={200}
        height={400}
        xAxisKey={"time"}
        yAxisKey={"value"}
        dataPointColors={["red", "blue"]}
        render={null}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
