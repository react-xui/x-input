"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ThousandInput = exports.LetterInput = exports.PosInterInput = exports.InterInput = exports.NumericInput = exports.InputContainer = exports.Input = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created with Visual Studio Code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * github: https://github.com/React-xui/x-input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * User: 田想兵
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 2018-11-27
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 20:00:00
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Contact: 55342775@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


//文本输入框
var Base = function (_Component) {
    _inherits(Base, _Component);

    function Base(props) {
        _classCallCheck(this, Base);

        var _this = _possibleConstructorReturn(this, (Base.__proto__ || Object.getPrototypeOf(Base)).call(this, props));

        _this.state = { value: typeof props.value === 'undefined' ? "" : props.value };
        _this.onChangeHandle = _this.onChangeHandle.bind(_this);
        return _this;
    }

    _createClass(Base, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProps, newState) {
            if (typeof newProps.value !== 'undefined' && newProps.value != this.state.value) {
                this.setState({ value: newProps.value });
            }
        }
    }, {
        key: "onChangeHandle",
        value: function onChangeHandle(e) {
            var value = e.target.value;

            this.setState({ value: value });
            this.props.onChange && this.props.onChange(e, value);
        }
    }, {
        key: "render",
        value: function render() {
            var cls = (this.props.className || "") + ' x-input';
            var newProps = _extends({}, this.props);
            delete newProps['className'];
            delete newProps['decimals'];
            delete newProps['onChange'];
            // delete newProps['value'];
            var value = this.state.value;
            (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' ? value = JSON.stringify(value) : null;
            var multiple = newProps.multiple;

            var props = _extends({ onChange: this.onChangeHandle, value: this.state.value }, newProps);
            var tag = multiple ? 'textarea' : 'input';
            return _react2.default.createElement(tag, props);
            // return (
            //     <input className={cls} onChange={this.onChangeHandle} value={this.state.value} {...newProps} />
            // )
        }
    }]);

    return Base;
}(_react.Component);

// export class NumericInput extends Component{
//     render(){
//         let reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
//         return <Base reg={reg} />
//     }
// }


var InputContainer = function InputContainer(WrappedComponnet, reg) {
    return function (_Component2) {
        _inherits(_class, _Component2);

        function _class(props) {
            _classCallCheck(this, _class);

            var _this2 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

            _this2.decimals = props.decimals;
            _this2.state = { value: typeof props.value === 'undefined' ? "" : _this2.format(props.value, true) };
            _this2.onChangeHandle = _this2.onChangeHandle.bind(_this2);
            return _this2;
        }

        _createClass(_class, [{
            key: "componentWillReceiveProps",
            value: function componentWillReceiveProps(newProps, newState) {
                if (newProps.value != this.state.value && typeof newProps.value !== 'undefined') {
                    this.format(newProps.value);
                    // this.setState({ value: newProps.value });
                }
            }
        }, {
            key: "format",
            value: function format(value, isinit) {
                var _this3 = this;

                var oldvalue = value;
                (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' ? value = JSON.stringify(value) : null;
                value = String(value).replace(/\,/g, '');
                var istriggerChange = true;
                if (this.state && (oldvalue == this.state.value || value == this.state.value)) {
                    istriggerChange = false;
                }
                if (reg && value != '') {
                    var arr = value.split('.');
                    if (arr.length > 1) {
                        value = arr[0] + '.' + arr[1].substr(0, this.decimals);
                    }
                    var res = value.match(reg);
                    value = res === null ? '' : res[0];
                }
                if (isinit) {
                    return value;
                } else {
                    this.setState({ value: value }, function () {
                        istriggerChange && _this3.props.onChange && _this3.props.onChange(value);
                    });
                }
            }
        }, {
            key: "onChangeHandle",
            value: function onChangeHandle(e) {
                var value = e.target.value;

                this.format(value);
            }
        }, {
            key: "render",
            value: function render() {
                var newProps = {
                    onChange: this.onChangeHandle,
                    value: this.state.value
                };
                var props = _extends({}, this.props, newProps);
                return _react2.default.createElement(WrappedComponnet, props);
            }
        }]);

        return _class;
    }(_react.Component);
};
var Input = InputContainer(Base);
var NumericInput = InputContainer(Base, /-?(0|[1-9][0-9]*)(\.[0-9]*)?/); //数字
var InterInput = InputContainer(Base, /-?(0|[1-9][0-9]*)/); //整数
var PosInterInput = InputContainer(Base, /(0|[1-9][0-9]*)/); //正整数
var LetterInput = InputContainer(Base, /[a-zA-Z]+/); //字母

var setCaretPosition = function setCaretPosition(tObj, sPos) {
    if (tObj.setSelectionRange) {
        setTimeout(function () {
            tObj.setSelectionRange(sPos, sPos);
            tObj.focus();
        }, 0);
    } else if (tObj.createTextRange) {
        var rng = tObj.createTextRange();
        rng.move('character', sPos);
        rng.select();
    }
};
//获取当前光标位置
var getPosition = function getPosition(element) {
    var cursorPos = 0;
    if (document.selection) {
        //IE
        var selectRange = document.selection.createRange();
        selectRange.moveStart('character', -element.value.length);
        cursorPos = selectRange.text.length;
    } else if (element && (element.selectionStart || element.selectionStart == '0')) {
        cursorPos = element.selectionStart;
    }
    return cursorPos;
};
//getDisplayName
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
var FormatContainer = function FormatContainer(WrappedComponnet, _format) {
    var _class2, _temp;

    return _temp = _class2 = function (_NumericInput) {
        _inherits(_class2, _NumericInput);

        function _class2() {
            _classCallCheck(this, _class2);

            return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
        }

        _createClass(_class2, [{
            key: "onChangeHandle",
            value: function onChangeHandle(e) {
                var value = e.target.value;

                this.format(value, false, e.target);
            }
        }, {
            key: "format",
            value: function format(value, isinit, target) {
                var _this5 = this;

                var oldvalue = value;
                value = _format(String(value).replace(/\,/g, ''), this.props);
                var istriggerChange = true;
                if (this.state && (oldvalue == this.state.value || value == this.state.value)) {
                    istriggerChange = false;
                }
                if (!isinit) {
                    var pos = getPosition(target);
                    this.setState({ value: value }, function () {
                        if (target) {
                            var len = target.value.length;
                            var rightpos = len - pos; //算出从右计算的光标位置
                            var tmp = _this5.state.value.length - rightpos;
                            // console.log(tmp)
                            setCaretPosition(target, tmp);
                        }
                        istriggerChange && _this5.props.onChange && _this5.props.onChange(value.replace(/\,/g, ''));
                    });
                } else {
                    return value;
                }
            }
        }]);

        return _class2;
    }(NumericInput), _class2.displayName = "HOC(" + getDisplayName(WrappedComponnet) + ")", _temp;
};

var formatThousandthNumber = function formatThousandthNumber(num, _ref) {
    var decimals = _ref.decimals;

    // number = number.replace(/\,/g,'');
    num = String(num).replace(/\,/g, '');
    var arr = num.split('.');
    var number = arr[0];
    // let decimals  = arr.length>1 ?arr[1].length:0;
    if ((typeof number === "undefined" ? "undefined" : _typeof(number)) == undefined) return '';
    if (!number && number !== 0) {
        return '';
    } else {
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = 0,
            sep = ',',
            dec = '.',
            s = '';
        s = (prec ? n.fromFixed(prec) : '' + Math.round(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        var str = s.join(dec);
        if (arr.length > 1) {
            str += '.' + arr[1].substr(0, decimals).replace(/[^0-9]/ig, "");
        }
        return str;
    }
};
var ThousandInput = FormatContainer(Base, formatThousandthNumber);
exports.Input = Input;
exports.InputContainer = InputContainer;
exports.NumericInput = NumericInput;
exports.InterInput = InterInput;
exports.PosInterInput = PosInterInput;
exports.LetterInput = LetterInput;
exports.ThousandInput = ThousandInput;