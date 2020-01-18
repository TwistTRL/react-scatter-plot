"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _PlottingUtils = require("./PlottingUtils");

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function round5(x) {
  return Math.round(Math.ceil(x / 5) * 5);
}

function round2(x) {
  return Math.round(Math.ceil(x / 2) * 2);
}

var YAxis = function (_Component) {
  _inherits(YAxis, _Component);

  function YAxis(props) {
    _classCallCheck(this, YAxis);

    var _this = _possibleConstructorReturn(this, (YAxis.__proto__ || Object.getPrototypeOf(YAxis)).call(this, props));

    _this.canvasW = _this.props.canvasW;
    _this.canvasH = _this.props.canvasH;
    _this.minY = _this.props.minY;
    _this.maxY = _this.props.maxY;
    _this.yAxisSkipInterval = 50;
    return _this;
  }

  _createClass(YAxis, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var yAxisLabelPadding = this.props.configs.axis.yAxisLabelPadding;
      this.generateYAxisLabels(this.maxY * 10);
      this.yAxisCanvas = this.refs.yAxisCanvas;
      this.yAxisCtx = this.yAxisCanvas.getContext("2d");
      this.drawYAxis(this.yAxisCtx, this.getYAxisLabelSkipInterval(this.minY, this.maxY, this.canvasH, yAxisLabelPadding, 20));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var yAxisLabelPadding = this.props.configs.axis.yAxisLabelPadding;
      this.minY = this.props.minY;
      this.maxY = this.props.maxY;
      this.drawYAxis(this.yAxisCtx, this.getYAxisLabelSkipInterval(this.minY, this.maxY, this.canvasH, yAxisLabelPadding, 20));
    }
  }, {
    key: "toDomYCoord_Linear",
    value: function toDomYCoord_Linear(height, minY, maxY, dataY) {
      return height - (dataY - minY) / ((maxY - minY) / height);
    }
  }, {
    key: "getYAxisLabelSkipInterval",
    value: function getYAxisLabelSkipInterval(minY, maxY, height) {
      var labelPadding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
      var labelTextHeight = arguments[4];

      var numOfLabelsCanFit = Math.round(height / (labelTextHeight + labelPadding));

      return round5((maxY - minY) / numOfLabelsCanFit);
    }
  }, {
    key: "generateYAxisLabels",
    value: function generateYAxisLabels(maxY) {
      this.yAxisLabels = [];
      var yAxisLabelInterval = 1;

      for (var curYAxisLabel = 0; curYAxisLabel < round5(maxY); curYAxisLabel += yAxisLabelInterval) {
        this.yAxisLabels.push(curYAxisLabel);
      }
    }

    // TODO: CACHE TEXT CANVAS

  }, {
    key: "drawYAxis",
    value: function drawYAxis(ctx, yAxisLabelInterval) {
      var textXPadding = 10;
      var yAxisHorizontalLineWidth = 5;

      // clear canvas
      ctx.clearRect(0, 0, this.canvasW, this.canvasH);
      ctx.beginPath();

      // y-axis vertical line styling
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2.5;
      // text styling
      ctx.font = "500 13px MuseoSans, sans-serif";
      ctx.lineWidth = 0.6;
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillStyle = "gray";

      // draw the y-axis vertical line
      ctx.moveTo(this.canvasW, 5);
      ctx.lineTo(this.canvasW, this.canvasH - 5);
      ctx.stroke();

      // draw the positive labels and horizontal lines
      for (var i = 0; i < this.maxY + yAxisLabelInterval; i += yAxisLabelInterval) {
        if (i % yAxisLabelInterval === 0) {
          var domY = Math.floor(this.toDomYCoord_Linear(this.canvasH, this.minY, this.maxY, this.yAxisLabels[i]));
          ctx.moveTo(this.canvasW - yAxisHorizontalLineWidth, domY);
          ctx.lineTo(this.canvasW, domY);
          ctx.fillText(this.yAxisLabels[i], this.canvasW - textXPadding, domY);
        }
      }

      if (this.minY < 0) {
        for (var _i = 0; _i < this.maxY + yAxisLabelInterval; _i += yAxisLabelInterval) {
          if (_i % yAxisLabelInterval === 0 && -this.yAxisLabels[_i] >= this.minY) {
            var _domY = Math.floor(this.toDomYCoord_Linear(this.canvasH, this.minY, this.maxY, -this.yAxisLabels[_i]));
            ctx.moveTo(this.canvasW - yAxisHorizontalLineWidth, _domY);
            ctx.lineTo(this.canvasW, _domY);
            ctx.fillText(-this.yAxisLabels[_i], this.canvasW - textXPadding, _domY);
          }
        }
      }

      ctx.stroke();
    }
  }, {
    key: "roundToNearestTenth",
    value: function roundToNearestTenth(n) {
      return (parseInt(n / 10, 10) + 1) * 10;
    }
  }, {
    key: "render",
    value: function render() {
      // width, height, data from props
      // reserve className for parent
      return _react2.default.createElement("canvas", {
        className: "plot-y-axis",
        ref: "yAxisCanvas",
        width: this.canvasW,
        height: this.canvasH
      });
    }
  }]);

  return YAxis;
}(_react.Component);

exports.default = YAxis;