import React, { Component } from "react";
import isEqual from "lodash.isequal";

class YAxis extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || this.state !== nextState;
  }

  render() {
    const {
      data,
      width,
      height,
      minY,
      maxY
    } = this.props;

    if (data.length < 1 || data === undefined) {
      return null;
    }

    return (
      null
    );
  }
}

export default YAxis;
