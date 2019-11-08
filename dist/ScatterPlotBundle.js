"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ScatterPlot = require("./ScatterPlot");

var _ScatterPlot2 = _interopRequireDefault(_ScatterPlot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScatterPlotBundle = function (_PureComponent) {
    _inherits(ScatterPlotBundle, _PureComponent);

    function ScatterPlotBundle() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ScatterPlotBundle);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScatterPlotBundle.__proto__ || Object.getPrototypeOf(ScatterPlotBundle)).call.apply(_ref, [this].concat(args))), _this), _this.filterDataToFitDtWindow = function (data, minX, maxX) {
            var minIndex = 0,
                maxIndex = 0;
            var filteredData = data;

            filteredData.array.forEach(function (d, i) {
                if (d.time <= minX) {
                    if (d.time < minX) {
                        if (i > 0) {
                            minIndex = i - 1;
                        } else {
                            minIndex = i;
                        }
                    } else {
                        minIndex = i;
                    }
                }

                // only take the first maxX
                if (d.time >= maxX && maxIndex === 0) {
                    maxIndex = i;
                }
            });

            if (maxIndex === 0) {
                maxIndex = filteredData.length - 1;
            }

            return filteredData.slice(minIndex, maxIndex);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScatterPlotBundle, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                data = _props.data,
                dtWindow = _props.dtWindow,
                width = _props.width,
                height = _props.height;


            var filteredData = data.filter(function (hr) {
                return hr["time"] >= dtWindow[0] && hr["time"] <= dtWindow[1];
            });

            return _react2.default.createElement(
                "div",
                { className: "scatter-plot-wrap", style: { position: "absolute" } },
                _react2.default.createElement(_ScatterPlot2.default, {
                    data: filteredData,
                    dtWindow: dtWindow,
                    width: width,
                    height: height }),
                this.props.currentOverlay ? this.props.render(filteredData) : null
            );
        }
    }]);

    return ScatterPlotBundle;
}(_react.PureComponent);

exports.default = ScatterPlotBundle;