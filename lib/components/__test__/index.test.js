'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input = require('../Input.jsx');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var setup = function setup(_ref) {
    var props = _objectWithoutProperties(_ref, []);

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Input2.default, props));
    return {
        props: props,
        wrapper: wrapper
    };
};

describe('Test App', function () {
    it('Test App"', function () {
        var _setup = setup({ value: 123 }),
            wrapper = _setup.wrapper;

        expect(wrapper.value()).toEqual('123');
    });
});