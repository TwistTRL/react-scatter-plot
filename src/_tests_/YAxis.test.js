import React from "react";
import { shallow, mount } from "enzyme";
import YAxis from "../lib/YAxis";

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
let props = {
  canvasW: 40,
  canvasH: 100,
  minY: -100,
  maxY: 100,
  configs: configs
};

const wrapper = shallow(<YAxis {...props} />);
