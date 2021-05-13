'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input = require('../components/Input');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                              * @Descripttion: 
                                                                                                                                                                                                                              * @Author: tianxiangbing
                                                                                                                                                                                                                              * @Date: 2019-09-06 17:20:04
                                                                                                                                                                                                                              * @LastEditTime: 2021-05-13 16:35:07
                                                                                                                                                                                                                              * @github: https://github.com/tianxiangbing
                                                                                                                                                                                                                              */


var setup = function setup(_ref) {
    var props = _objectWithoutProperties(_ref, []);

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Input.Input, props));
    return {
        props: props,
        wrapper: wrapper
    };
};

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, App);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref2, [this].concat(args))), _this), _this.state = { value: 233 }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Input.Input, { value: this.state.value })
            );
        }
    }]);

    return App;
}(_react2.default.Component);

describe('Test Input', function () {
    it('测试初始化赋值', function () {
        var _setup = setup({ value: "123" }),
            wrapper = _setup.wrapper;

        console.log(wrapper);
        // expect(wrapper.get(0).props.value).toEqual('123');
        expect(wrapper.state('value')).toEqual('123');
    });
    it('测试修改props的value时state是否同步', function () {
        var _setup2 = setup({ value: "123" }),
            wrapper = _setup2.wrapper;

        var spy = _sinon2.default.spy(_Input.Input.prototype, 'componentWillReceiveProps');
        expect(spy).toHaveProperty('callCount', 0);
        wrapper.setProps({ 'value': '456' });
        expect(wrapper.state('value')).toEqual('456');
        expect(spy).toHaveProperty('callCount', 1);
    });
    it('测试父组件更新后,input的props更新同步', function () {
        var parentNode = (0, _enzyme.shallow)(_react2.default.createElement(App, null));
        parentNode.setState({ value: 555 });
        console.log(parentNode.find('input'));
        expect(parentNode.find('div').children().prop('value')).toEqual(555);
    });
});