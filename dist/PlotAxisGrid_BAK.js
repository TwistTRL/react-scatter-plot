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

var PlotAxisGrid = function (_Component) {
  _inherits(PlotAxisGrid, _Component);

  function PlotAxisGrid(props) {
    _classCallCheck(this, PlotAxisGrid);

    var _this = _possibleConstructorReturn(this, (PlotAxisGrid.__proto__ || Object.getPrototypeOf(PlotAxisGrid)).call(this, props));

    _this.canvasW = _this.props.canvasW;
    _this.canvasH = _this.props.canvasH;
    _this.minY = _this.props.minY;
    _this.maxY = _this.props.maxY;
    console.log(_this.canvasW);
    return _this;
  }

  _createClass(PlotAxisGrid, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var yAxisLabelPadding = this.props.configs.axis.yAxisLabelPadding;
      this.plotAxisGridCanvas = this.refs.plotAxisGridCanvas;
      this.plotAxisGridCtx = this.plotAxisGridCanvas.getContext("2d");

      var canvas = document.createElement("canvas");
      canvas.width = this.canvasW;
      canvas.height = 1;
      var ctx = canvas.getContext("2d");
      ctx.moveTo(0, 0);
      ctx.lineTo(0, this.canvasW);
      ctx.stroke();
      this.cachedGridLine = canvas;

      this.generateYAxisLabels(this.maxY * 1.5);
      this.drawYAxisGrid(this.plotAxisGridCtx, this.getYAxisSkipInterval(this.minY, this.maxY, this.canvasH, yAxisLabelPadding, 20));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var yAxisLabelPadding = this.props.configs.axis.yAxisLabelPadding;
      this.minY = this.props.minY;
      this.maxY = this.props.maxY;
      this.drawYAxisGrid(this.plotAxisGridCtx, this.getYAxisSkipInterval(this.minY, this.maxY, this.canvasH, yAxisLabelPadding, 20));
    }
  }, {
    key: "getYAxisSkipInterval",
    value: function getYAxisSkipInterval(minY, maxY, height) {
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
  }, {
    key: "drawYAxisGrid",
    value: function drawYAxisGrid(ctx, yAxisSkipInterval) {
      // clear canvas
      ctx.clearRect(0, 0, this.canvasW, this.canvasH);
      ctx.beginPath();
      // y-axis vertical line styling
      ctx.strokeStyle = "rgba(211,211,211, 0.6)";
      ctx.lineWidth = 1;

      for (var i = 0; i < this.yAxisLabels.length; i++) {
        if (i % yAxisSkipInterval === 0) {
          var domY = (0, _PlottingUtils.toDomYCoord_Linear)(this.canvasH, this.minY, this.maxY, this.yAxisLabels[i]);
          ctx.moveTo(0, domY);
          ctx.lineTo(this.canvasW, domY);
          // ctx.drawImage(this.cachedGridLine, 0, domY);
        }
      }

      if (this.minY < 0) {
        for (var _i = 0; _i < this.yAxisLabels.length; _i++) {
          if (_i % yAxisSkipInterval === 0) {
            var _domY = (0, _PlottingUtils.toDomYCoord_Linear)(this.canvasH, this.minY, this.maxY, -this.yAxisLabels[_i]);
            ctx.moveTo(0, _domY);
            ctx.lineTo(this.canvasW, _domY);
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