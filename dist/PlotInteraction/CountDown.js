"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CountDown = function (_PureComponent) {
  _inherits(CountDown, _PureComponent);

  function CountDown() {
    _classCallCheck(this, CountDown);

    return _possibleConstructorReturn(this, (CountDown.__proto__ || Object.getPrototypeOf(CountDown)).apply(this, arguments));
  }

  _createClass(CountDown, [{
    key: "render",
    value: function render() {
      return null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          timeout = _props.timeout,
          callback = _props.callback;

      this.timeout = setTimeout(callback, timeout);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      clearTimeout(this.timeout);
      var _props2 = this.props,
          timeout = _props2.timeout,
          callback = _props2.callback;

      this.timeout = setTimeout(callback, timeout);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }]);

  return CountDown;
}(_react.PureComponent);

exports.default = CountDown;