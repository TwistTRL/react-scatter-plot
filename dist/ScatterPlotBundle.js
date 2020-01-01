"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ScatterPlot = require("./ScatterPlot");

var _ScatterPlot2 = _interopRequireDefault(_ScatterPlot);

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
          data = _props.data,
          dataPointColors = _props.dataPointColors,
          visibleXRange = _props.visibleXRange,
          width = _props.width,
          height = _props.height,
          minY = _props.minY,
          maxY = _props.maxY,
          xAxisKey = _props.xAxisKey,
          yAxisKey = _props.yAxisKey;


      if (data.length < 1 || data === undefined) {
        return null;
      }

      var filteredData = [];
      data.forEach(function (dataArr, i) {
        filteredData[i] = dataArr.filter(function (d) {
          return d[xAxisKey] >= visibleXRange[0] && d[xAxisKey] <= visibleXRange[1];
        });
      });

      return _react2.default.createElement(_ScatterPlot2.default, {
        data: filteredData,
        dataPointColors: dataPointColors,
        visibleXRange: visibleXRange,
        width: width,
        height: height,
        minY: minY,
        maxY: maxY,
        xAxisKey: xAxisKey,
        yAxisKey: yAxisKey
      });
    }
  }]);

  return ScatterPlotBundle;
}(_react.Component);

exports.default = ScatterPlotBundle;