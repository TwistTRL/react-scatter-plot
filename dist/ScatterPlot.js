"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

var _PlottingUtils = require("./PlottingUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScatterPlot = function (_Component) {
  _inherits(ScatterPlot, _Component);

  function ScatterPlot(props) {
    _classCallCheck(this, ScatterPlot);

    var _this = _possibleConstructorReturn(this, (ScatterPlot.__proto__ || Object.getPrototypeOf(ScatterPlot)).call(this, props));

    _this.drawScatterPlot = function (ctx) {
      var _this$props = _this.props,
          data = _this$props.data,
          dataPointColors = _this$props.dataPointColors,
          visibleXRange = _this$props.visibleXRange,
          minY = _this$props.minY,
          maxY = _this$props.maxY,
          xAxisKey = _this$props.xAxisKey,
          yAxisKey = _this$props.yAxisKey;


      if (data === undefined) {
        return;
      }

      ctx.clearRect(0, 0, _this.canvasW, _this.canvasH);

      data.forEach(function (dataArr, i) {
        if (dataArr.length > 0) {
          dataArr.forEach(function (d) {
            var domY = void 0,
                domX = (0, _PlottingUtils.toDomXCoord_Linear)(_this.canvasW, visibleXRange[0], visibleXRange[1], d[xAxisKey]);

            var circle = _this.getCircle(dataPointColors[i]);

            domY = (0, _PlottingUtils.toDomYCoord_Linear)(_this.canvasH, minY, maxY, d[yAxisKey]);

            ctx.drawImage(circle, domX, domY);
          });
        }
      });
    };

    _this.canvasW = _this.props.width;
    _this.canvasH = _this.props.height;
    // {color: canvas}
    _this.dataPointColorCanvasCache = {};
    return _this;
  }

  _createClass(ScatterPlot, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scatterPlotCanvas = this.refs.scatterPlotCanvas;
      this.scatterPlotCtx = this.scatterPlotCanvas.getContext("2d");
      this.drawScatterPlot(this.scatterPlotCtx);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      this.drawScatterPlot(this.scatterPlotCtx);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _lodash2.default)(this.props, nextProps) || this.state !== nextState;
    }
  }, {
    key: "roundRect",
    value: function roundRect(ctx, x0, y0, x1, y1, r, color) {
      var w = x1 - x0;
      var h = y1 - y0;
      if (r > w / 2) r = w / 2;
      if (r > h / 2) r = h / 2;
      ctx.beginPath();
      ctx.moveTo(x1 - r, y0);
      ctx.quadraticCurveTo(x1, y0, x1, y0 + r);
      ctx.lineTo(x1, y1 - r);
      ctx.quadraticCurveTo(x1, y1, x1 - r, y1);
      ctx.lineTo(x0 + r, y1);
      ctx.quadraticCurveTo(x0, y1, x0, y1 - r);
      ctx.lineTo(x0, y0 + r);
      ctx.quadraticCurveTo(x0, y0, x0 + r, y0);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }
  }, {
    key: "getCircle",
    value: function getCircle(color) {
      if (this.dataPointColorCanvasCache[color] === undefined) {
        var canvas = document.createElement("canvas");
        canvas.width = 6;
        canvas.height = 6;
        var ctx = canvas.getContext("2d");
        ctx.arc(3, 3, 2, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        this.dataPointColorCanvasCache[color] = canvas;
      }
      return this.dataPointColorCanvasCache[color];
    }
  }, {
    key: "render",
    value: function render() {
      var styles = {
        scatterPlotCanvas: {
          position: "absolute"
        }
      };

      return _react2.default.createElement("canvas", {
        className: "scatter-plot-canvas",
        ref: "scatterPlotCanvas",
        width: this.canvasW,
        height: this.canvasH,
        style: styles.scatterPlotCanvas
      });
    }
  }]);

  return ScatterPlot;
}(_react.Component);

exports.default = ScatterPlot;