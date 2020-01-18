"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

var _ScatterPlot = require("./ScatterPlot");

var _ScatterPlot2 = _interopRequireDefault(_ScatterPlot);

var _YAxis = require("./YAxis");

var _YAxis2 = _interopRequireDefault(_YAxis);

var _PlotAxisGrid = require("./PlotAxisGrid");

var _PlotAxisGrid2 = _interopRequireDefault(_PlotAxisGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function round5(x) {
  return Math.ceil(x / 5) * 5;
}

var ScatterPlotBundle = function (_Component) {
  _inherits(ScatterPlotBundle, _Component);

  function ScatterPlotBundle() {
    _classCallCheck(this, ScatterPlotBundle);

    return _possibleConstructorReturn(this, (ScatterPlotBundle.__proto__ || Object.getPrototypeOf(ScatterPlotBundle)).apply(this, arguments));
  }

  _createClass(ScatterPlotBundle, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _lodash2.default)(this.props, nextProps) || this.state !== nextState;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          dataSets = _props.dataSets,
          dataPointColors = _props.dataPointColors,
          width = _props.width,
          height = _props.height,
          minY = _props.minY,
          maxY = _props.maxY,
          xAxisKey = _props.xAxisKey,
          yAxisKey = _props.yAxisKey,
          configs = _props.configs,
          isRenderPlotOnly = _props.isRenderPlotOnly;


      if (dataSets.length < 1 || dataSets === undefined) {
        return null;
      }

      var _configs$axis = configs.axis,
          isDynamicXAxis = _configs$axis.isDynamicXAxis,
          isDynamicYAxis = _configs$axis.isDynamicYAxis,
          yAxisPadding = _configs$axis.yAxisPadding;

      var visibleYRange = [Number.MAX_VALUE, Number.MIN_VALUE];
      var visibleXRange = isDynamicXAxis ? this.props.visibleXRange : [Number.MAX_VALUE, Number.MIN_VALUE];
      var visibleYRangeDistance = 0;
      var yAxisPanelWidth = 40;
      var plotWidth = width - yAxisPanelWidth;

      visibleYRangeDistance = round5(visibleYRange[1] - visibleYRange[0]);
      visibleYRange[0] -= yAxisPadding > 0 ? yAxisPadding : visibleYRangeDistance * 0.1; // TODO: figure out y padding
      visibleYRange[1] += yAxisPadding > 0 ? yAxisPadding : visibleYRangeDistance * 0.1;

      if (!isRenderPlotOnly) {
        visibleYRange = maxY !== null ? [minY, maxY] : visibleYRange;
        return _react2.default.createElement(
          "table",
          { className: "chart-table", style: { borderCollapse: "collapse" } },
          _react2.default.createElement(
            "tbody",
            null,
            _react2.default.createElement(
              "tr",
              { className: "chart-table-row" },
              _react2.default.createElement(
                "td",
                {
                  className: "chart-table-col",
                  style: { width: yAxisPanelWidth }
                },
                " ",
                _react2.default.createElement(_YAxis2.default, {
                  canvasW: yAxisPanelWidth,
                  canvasH: height,
                  minY: visibleYRange[0],
                  maxY: visibleYRange[1],
                  configs: configs
                })
              ),
              _react2.default.createElement(
                "td",
                { className: "chart-table-col", style: { width: plotWidth } },
                " ",
                _react2.default.createElement(
                  "div",
                  { style: { position: "absolute" } },
                  _react2.default.createElement(_PlotAxisGrid2.default, {
                    canvasW: plotWidth,
                    canvasH: height,
                    minY: visibleYRange[0],
                    maxY: visibleYRange[1],
                    configs: configs
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { style: { position: "absolute" } },
                  _react2.default.createElement(_ScatterPlot2.default, {
                    dataSets: dataSets,
                    dataPointColors: dataPointColors,
                    visibleXRange: visibleXRange,
                    visibleYRange: visibleYRange,
                    width: plotWidth,
                    height: height,
                    xAxisKey: xAxisKey,
                    yAxisKey: yAxisKey,
                    configs: configs
                  })
                )
              )
            )
          )
        );
      }

      return _react2.default.createElement(_ScatterPlot2.default, {
        dataSets: dataSets,
        dataPointColors: dataPointColors,
        visibleXRange: visibleXRange,
        visibleYRange: maxY !== null ? [minY, maxY] : visibleYRange,
        width: plotWidth,
        height: height,
        xAxisKey: xAxisKey,
        yAxisKey: yAxisKey,
        configs: configs
      });
    }
  }]);

  return ScatterPlotBundle;
}(_react.Component);

exports.default = ScatterPlotBundle;