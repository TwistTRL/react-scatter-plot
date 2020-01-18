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

    _this.canvasW = _this.props.width;
    _this.canvasH = _this.props.height;
    // {color: canvas}
    _this.dataPointColorCanvasCache = {};
    _this.dotCanvasSize = 6;
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
    key: "drawScatterPlot",
    value: function drawScatterPlot(ctx) {
      var _props = this.props,
          dataSets = _props.dataSets,
          dataPointColors = _props.dataPointColors,
          visibleXRange = _props.visibleXRange,
          visibleYRange = _props.visibleYRange,
          xAxisKey = _props.xAxisKey,
          yAxisKey = _props.yAxisKey,
          configs = _props.configs;


      if (dataSets === undefined) {
        return;
      }

      var dotCanvasSize = configs.plotStyling.dotSize > 0 ? configs.plotStyling.dotSize : this.dotCanvasSize;

      ctx.clearRect(0, 0, this.canvasW, this.canvasH);

      for (var i = 0; i < dataSets.length; i++) {
        var curDataSet = dataSets[i];
        if (curDataSet.length > 0) {
          for (var j = 0; j < curDataSet.length; j++) {
            var curDataObj = curDataSet[j];
            if (curDataObj[xAxisKey] >= visibleXRange[0] && curDataObj[xAxisKey] <= visibleXRange[1]) {
              var domY = void 0,
                  domX = Math.floor((0, _PlottingUtils.toDomXCoord_Linear)(this.canvasW, visibleXRange[0], visibleXRange[1], curDataObj[xAxisKey]) - dotCanvasSize / 2);

              var circle = this.getCircle(dataPointColors[i], dotCanvasSize);

              domY = Math.floor((0, _PlottingUtils.toDomYCoord_Linear)(this.canvasH, visibleYRange[0], visibleYRange[1], curDataObj[yAxisKey]) - dotCanvasSize / 2);

              ctx.drawImage(circle, domX, domY);
            }
          }
        }
      }
    }
  }, {
    key: "getCircle",
    value: function getCircle(color) {
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;

      var cachedDataPointColorCanvas = this.dataPointColorCanvasCache[color + size];

      if (cachedDataPointColorCanvas === undefined) {
        var canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext("2d");
        ctx.arc(size / 2, size / 2, size / 3, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        cachedDataPointColorCanvas = canvas;
        this.dataPointColorCanvasCache[color + size] = canvas;
      }

      return cachedDataPointColorCanvas;
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