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

    _this.toDomYCoord_Linear = function (height, minY, maxY, dataY) {
      return height - (dataY - minY) / ((maxY - minY) / height);
    };

    _this.generateYAxisLabels = function (minY, maxY, height) {
      var labelPadding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
      var labelTextHeight = arguments[4];

      var yAxisLabels = [];
      var numOfLabelsCanFit = Math.round(height / (labelTextHeight + labelPadding));
      var yAxisSpan = round5(maxY - minY);
      var yAxisLabelInterval = round5(yAxisSpan / numOfLabelsCanFit);

      // negative labels
      for (var curYAxisLabel = -yAxisLabelInterval; curYAxisLabel > round5(minY); curYAxisLabel -= yAxisLabelInterval) {
        yAxisLabels.push(curYAxisLabel);
      }

      // positive labels
      for (var _curYAxisLabel = 0; _curYAxisLabel < round5(maxY); _curYAxisLabel += yAxisLabelInterval) {
        yAxisLabels.push(_curYAxisLabel);
      }

      return yAxisLabels;
    };

    _this.drawYAxis = function (ctx) {
      var textXPadding = 10;
      var yAxisHorizontalLineWidth = 5;
      var yAxisLabelPadding = _this.props.configs.axis.yAxisLabelPadding;
      var yAxisLabels = _this.generateYAxisLabels(_this.minY, _this.maxY, _this.canvasH, yAxisLabelPadding, 20);

      // clear canvas
      ctx.clearRect(0, 0, _this.canvasW, _this.canvasH);
      ctx.beginPath();

      // y-axis vertical line styling
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2.5;
      // text styling
      ctx.font = "500 13px Museo Sans, sans-serif";
      ctx.lineWidth = 0.6;
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillStyle = "gray";

      // draw the y-axis vertical line
      ctx.moveTo(_this.canvasW, 5);
      ctx.lineTo(_this.canvasW, _this.canvasH - 5);
      ctx.stroke();

      // draw the labels and horizontal lines
      yAxisLabels.forEach(function (yAxisLabel) {
        var domY = _this.toDomYCoord_Linear(_this.canvasH, _this.minY, _this.maxY, yAxisLabel);
        ctx.moveTo(_this.canvasW - yAxisHorizontalLineWidth, domY);
        ctx.lineTo(_this.canvasW, domY);
        ctx.fillText(yAxisLabel, _this.canvasW - textXPadding, domY);
      });

      ctx.stroke();
    };

    _this.canvasW = _this.props.canvasW;
    _this.canvasH = _this.props.canvasH;
    _this.minY = _this.props.minY;
    _this.maxY = _this.props.maxY;
    return _this;
  }

  _createClass(YAxis, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.yAxisCanvas = this.refs.yAxisCanvas;
      this.yAxisCtx = this.yAxisCanvas.getContext("2d");
      this.drawYAxis(this.yAxisCtx);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.minY = this.props.minY;
      this.maxY = this.props.maxY;
      this.drawYAxis(this.yAxisCtx);
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