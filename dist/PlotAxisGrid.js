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

var PlotAxisGrid = function (_Component) {
  _inherits(PlotAxisGrid, _Component);

  function PlotAxisGrid(props) {
    _classCallCheck(this, PlotAxisGrid);

    var _this = _possibleConstructorReturn(this, (PlotAxisGrid.__proto__ || Object.getPrototypeOf(PlotAxisGrid)).call(this, props));

    _this.canvasW = _this.props.canvasW;
    _this.canvasH = _this.props.canvasH;
    _this.minY = _this.props.minY;
    _this.maxY = _this.props.maxY;
    _this.horiGridLineCache = undefined;
    return _this;
  }

  _createClass(PlotAxisGrid, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.plotAxisGridCanvas = this.refs.plotAxisGridCanvas;
      this.plotAxisGridCtx = this.plotAxisGridCanvas.getContext("2d");

      // y-axis vertical line styling
      this.plotAxisGridCtx.strokeStyle = "rgba(211,211,211, 0.6)";
      this.plotAxisGridCtx.lineWidth = 1;

      this.yAxisIntervals = this.generateYAxisLabels(this.maxY * 10);
      this.horiGridLineCache = this.getHoriLineCanvas();
      this.drawYAxisGrid(this.plotAxisGridCtx, this.getYAxisLabelSkipInterval(this.minY, this.maxY, this.canvasH, this.yAxisLabelPadding, 20));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.minY = this.props.minY;
      this.maxY = this.props.maxY;
      this.drawYAxisGrid(this.plotAxisGridCtx, this.getYAxisLabelSkipInterval(this.minY, this.maxY, this.canvasH, this.yAxisLabelPadding, 20));
    }
  }, {
    key: "generateYAxisLabels",
    value: function generateYAxisLabels(maxY) {
      var yAxisLabels = [];
      var yAxisLabelInterval = 1;

      for (var curYAxisLabel = 0; curYAxisLabel < round5(maxY); curYAxisLabel += yAxisLabelInterval) {
        yAxisLabels.push(curYAxisLabel);
      }

      return yAxisLabels;
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
    key: "drawYAxisGrid",
    value: function drawYAxisGrid(ctx, yAxisIntervals) {
      // clear canvas
      ctx.clearRect(0, 0, this.canvasW, this.canvasH);
      ctx.beginPath();

      for (var i = 0; i < this.maxY; i += yAxisIntervals) {
        var domY = Math.floor((0, _PlottingUtils.toDomYCoord_Linear)(this.canvasH, this.minY, this.maxY, this.yAxisIntervals[i]));
        // ctx.moveTo(0, domY);
        // ctx.lineTo(this.canvasW, domY);
        ctx.drawImage(this.horiGridLineCache, 0, domY - 0.5);
      }

      if (this.minY < 0) {
        for (var _i = yAxisIntervals; _i < this.maxY; _i += yAxisIntervals) {
          var _domY = Math.floor((0, _PlottingUtils.toDomYCoord_Linear)(this.canvasH, this.minY, this.maxY, -this.yAxisIntervals[_i]));
          // ctx.moveTo(0, domY);
          // ctx.lineTo(this.canvasW, domY);
          ctx.drawImage(this.horiGridLineCache, 0, _domY - 0.5);
        }
      }

      ctx.stroke();
    }
  }, {
    key: "getHoriLineCanvas",
    value: function getHoriLineCanvas() {
      var cachedHoriLineCanvas = this.cachedHoriLineCanvas;

      if (cachedHoriLineCanvas === undefined) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = this.canvasW;
        canvas.height = 1;

        ctx.strokeStyle = "gray";
        ctx.lineWidth = 1;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.floor(canvas.width), 0);
        ctx.stroke();
        cachedHoriLineCanvas = canvas;
      }

      return cachedHoriLineCanvas;
    }
  }, {
    key: "render",
    value: function render() {
      // width, height, data from props
      // reserve className for parent
      return _react2.default.createElement("canvas", {
        className: "plot-axis-grid",
        ref: "plotAxisGridCanvas",
        width: this.canvasW,
        height: this.canvasH
      });
    }
  }]);

  return PlotAxisGrid;
}(_react.Component);

exports.default = PlotAxisGrid;