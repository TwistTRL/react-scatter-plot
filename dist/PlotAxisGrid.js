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
    return _this;
  }

  _createClass(PlotAxisGrid, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.plotAxisGridCanvas = this.refs.plotAxisGridCanvas;
      this.plotAxisGridCtx = this.plotAxisGridCanvas.getContext("2d");
      this.drawYAxisGrid(this.plotAxisGridCtx);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.minY = this.props.minY;
      this.maxY = this.props.maxY;
      this.drawYAxisGrid(this.plotAxisGridCtx);
    }
  }, {
    key: "generateYAxisIntervals",
    value: function generateYAxisIntervals(minY, maxY, height, labelPadding, labelTextHeight) {
      this.yAxisIntervals = [];
      var numOfLabelsCanFit = Math.round(height / (labelTextHeight + labelPadding));
      var yAxisSpan = round5(maxY - minY);
      var yAxisLabelInterval = round5(yAxisSpan / numOfLabelsCanFit);

      for (var curYAxisLabel = 0; curYAxisLabel < round5(maxY); curYAxisLabel += yAxisLabelInterval) {
        this.yAxisIntervals.push(curYAxisLabel);
      }
    }
  }, {
    key: "drawYAxisGrid",
    value: function drawYAxisGrid(ctx) {
      this.generateYAxisIntervals(this.minY, this.maxY, this.canvasH, 20, 20);

      // clear canvas
      ctx.clearRect(0, 0, this.canvasW, this.canvasH);
      ctx.beginPath();
      // y-axis vertical line styling
      ctx.strokeStyle = "rgba(211,211,211, 0.6)";
      ctx.lineWidth = 1;

      for (var i = 0; i < this.yAxisIntervals.length; i++) {
        var domY = (0, _PlottingUtils.toDomYCoord_Linear)(this.canvasH, this.minY, this.maxY, this.yAxisIntervals[i]);
        ctx.moveTo(0, domY);
        ctx.lineTo(this.canvasW, domY);
      }
      ctx.stroke();

      if (this.minY < 0) {
        for (var _i = 0; _i < this.yAxisIntervals.length; _i++) {
          var _domY = (0, _PlottingUtils.toDomYCoord_Linear)(this.canvasH, this.minY, this.maxY, -this.yAxisIntervals[_i]);
          ctx.moveTo(0, _domY);
          ctx.lineTo(this.canvasW, _domY);
        }
        ctx.stroke();
      }
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