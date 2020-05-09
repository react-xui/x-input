'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Descripttion: 数字输入框
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: tianxiangbing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Date: 2020-04-16 18:45:09
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @LastEditTime: 2020-05-09 18:00:24
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @github: https://github.com/tianxiangbing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


//设置光标位置
var setCaretPosition = function setCaretPosition(tObj, sPos) {
    if (tObj.setSelectionRange) {
        tObj.setSelectionRange(sPos, sPos);
        tObj.focus();
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

var NumberInput = function (_React$PureComponent) {
    _inherits(NumberInput, _React$PureComponent);

    _createClass(NumberInput, [{
        key: 'formatThousandthNumber',

        //千分位
        value: function formatThousandthNumber(num) {
            var isAutoZero = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var _props = this.props,
                decimals = _props.decimals,
                isFormat = _props.isFormat;

            if (isNaN(decimals)) {
                //当传入的小数位非数字时，不进行自动补0
                isAutoZero = false;
            }
            if (!isFormat) {
                return num;
            }
            // number = number.replace(/\,/g,'');
            num = String(num).replace(/\,/g, '');
            var isnegative = false;
            if (num.indexOf('-') == 0) {
                num = num.replace(/\-/gi, '');
                isnegative = true;
            }
            var arr = num.split('.');
            var number = arr[0];
            // let decimals  = arr.length>1 ?arr[1].length:0;
            if ((typeof number === 'undefined' ? 'undefined' : _typeof(number)) == undefined) return '';
            if (!number && number !== 0) {
                return isnegative ? '-' : '';
            } else {
                number = (number + '').replace(/[^0-9+-Ee.]/g, '');
                var n = +number,
                    prec = 0,
                    sep = ',',
                    dec = '.',
                    s = '';
                s = number.split('.'); //(prec ? n.fromFixed(prec) : '' + Math.round(n)).split('.');
                var re = /(-?\d+)(\d{3})/;
                while (re.test(s[0])) {
                    s[0] = s[0].replace(re, "$1" + sep + "$2");
                }

                if ((s[1] || '').length < prec) {
                    s[1] = s[1] || '';
                    s[1] += new Array(prec - s[1].length + 1).join('0');
                }
                var str = s.join(dec);
                //这里根据isAutoZero进行补0，如果已经是小数，则分隔小数位补0，如果是整数，加小数点补
                if (arr.length > 1 && !isNaN(decimals)) {
                    //add autozero
                    var decnum = arr[1].substr(0, decimals).replace(/[^0-9]/ig, "");
                    if (isAutoZero) {
                        decnum = decnum + Array(decimals + 1).join(0).slice(0, Math.max(0, decimals - arr[1].length));
                    }
                    str += '.' + decnum;
                } else {
                    if (isAutoZero) {
                        str += '.' + Array(decimals + 1).join(0);
                    }
                }
                if (decimals === 0) {
                    str = str.split('.')[0];
                }
                if (isnegative) {
                    return '-' + str;
                }
                return str;
            }
        }
    }]);

    function NumberInput(props) {
        _classCallCheck(this, NumberInput);

        var _this = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props));

        var value = props.value,
            decimals = props.decimals,
            defaultValue = props.defaultValue;

        if (typeof value === 'undefined') {
            if (typeof defaultValue !== 'undefined') {
                value = defaultValue;
            } else {
                value = '';
            }
        }
        _this.defaultValue = value; //内置defaultValue为初始值.
        _this.state = { value: value, displayValue: _this.formatThousandthNumber(value, true) };
        _this.onChange = _this.onChange.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);
        _this.isFocus = false; //判断是否是当前焦点框 ，用来判断是否需要格式化
        _this.onKeyUp = _this.onKeyUp.bind(_this);
        return _this;
    }

    _createClass(NumberInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // console.log('willreceive被调用....')
            // console.log('########', nextProps.value, this.isFocus)
            var _props2 = this.props,
                value = _props2.value,
                decimals = _props2.decimals;

            if (typeof nextProps.value !== 'undefined' && !this.isFocus) {
                //只有在不为undefeined的情况下才处理接受值
                if (nextProps.value !== value || decimals !== nextProps.decimals) {
                    // if ( nextProps.value !== this.state.value) {
                    // console.log(nextProps.value)
                    this.changeState(nextProps.value, true, nextProps);
                    // }
                }
            }
        }
        //统一返回值

    }, {
        key: 'returnValue',
        value: function returnValue(value) {
            var _props3 = this.props,
                _props3$returnType = _props3.returnType,
                returnType = _props3$returnType === undefined ? 'Number' : _props3$returnType,
                onChange = _props3.onChange;
            // console.log(value)
            // console.log(returnType)

            var newValue = value;
            if (String(value).length <= 16 && value !== '-' && value !== '') {
                newValue = window[returnType](value);
            }
            // console.log(newValue)
            // onChange && this.debounce( onChange,1000 )(newValue)
            // onChange && onChange(newValue);
            this.newValue = newValue;
            this.debounce(onChange);
        }
    }, {
        key: 'debounce',
        value: function debounce(fn) {
            var _this2 = this;

            if (this.props.delay) {
                var now = Date.now();
                !this.timer ? this.timer = setTimeout(function () {
                    clearTimeout(_this2.timer);
                    _this2.timer = null;
                    fn && fn(_this2.newValue);
                }, this.props.delay) : null;
            } else {
                fn && fn(this.newValue);
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var _this3 = this;

            // console.log(this.props.readOnly,e.target.value)
            this.isFocus = true;
            if (!this.props.disabled && !this.props.readOnly) {
                var target = e.target;
                var value = target.value;

                var pos = getPosition(target);
                var len = target.value.length;
                var rightpos = len - pos; //算出从右计算的光标位置
                this.changeState(value, false, this.props, function (v, dv) {
                    //重置光标位置
                    var pos = dv.length - rightpos;
                    setCaretPosition(target, pos);
                }, function () {
                    _this3.forceUpdate(function () {
                        setCaretPosition(target, pos - 1);
                    });
                });
            }
        }
    }, {
        key: 'onFocus',
        value: function onFocus(e) {
            this.isFocus = true;
            // console.log('进了focus')
            this.props.onFocus && this.props.onFocus(e);
        }
    }, {
        key: 'onBlur',
        value: function onBlur(e) {
            //在blur里只作补0，然后调用props上的blur
            this.isFocus = false;
            var displayValue = this.formatThousandthNumber(this.state.value, true);
            if (displayValue !== this.state.displayValue) {
                this.setState({ displayValue: displayValue });
            }
            this.props.onBlur && this.props.onBlur(e);
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(e) {
            //k,m判断//keycode 75 k,77 m
            // console.log(e.keyCode)
            this.isFocus = true;
            var value = this.state.value;
            if (value) {
                switch (e.keyCode) {
                    case 75:
                        {
                            value = +value * 1000;
                            break;
                        }
                    case 77:
                        {
                            value = +value * 1000000;
                            break;
                        }
                }
                this.changeState(value, false, this.props);
            }
        }
        //统一修改value值

    }, {
        key: 'changeState',
        value: function changeState(value, isAutoZero, props, fn, nofn) {
            var _this4 = this;

            var v = String(value).replace(/\,/gi, '');
            //这里不再接收传递的isAutoZero参数，只根据是否获取的焦点判断。
            this.isFocus ? isAutoZero = false : isAutoZero = true;
            //如果不支持负数，去掉负号
            if (!props.negative) {
                v = v.replace(/\-/gi, '');
            }
            //判断是否为数字，不是则为上一次的值
            if (isNaN(v) && v !== '-') {
                v = this.state.value;
            } else {
                //判断maxLength长度
                var integer = v.split('.')[0].replace(/\-/gi, '');
                if (props.maxLength && integer.length > props.maxLength) {
                    v = this.state.value;
                }
            }
            //转换为字符串进行比较，先去除逗号
            if (v !== String(this.state.value)) {
                //这里如果是科学计数了，就以字符串返回
                var tmp = String(v).split('.');
                if (!isNaN(v)) {
                    //大于16位则返回字符串，是数字
                    var isScience = tmp[0].length > 16;
                    if (isScience) {
                        v = String(v);
                    }
                }
                var dv = this.formatThousandthNumber(v, isAutoZero);
                var oldv = this.state.value;
                v = dv.replace(/\,/gi, '');
                this.setState({ value: v, displayValue: dv }, function () {
                    if (oldv === '-') oldv = '';
                    if (v === '-') v = '';
                    if (oldv !== v) {
                        _this4.returnValue(v);
                    }
                    fn && fn(v, dv);
                });
            } else {
                nofn && nofn();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var displayValue = this.state.displayValue;
            var _props4 = this.props,
                onClick = _props4.onClick,
                disabled = _props4.disabled,
                onFocus = _props4.onFocus,
                readOnly = _props4.readOnly,
                onMouseEnter = _props4.onMouseEnter,
                onMouseLeave = _props4.onMouseLeave;

            return _react2.default.createElement('input', { onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onKeyUp: this.onKeyUp, onFocus: this.onFocus, type: 'text', readOnly: readOnly, onClick: onClick, disabled: disabled, onBlur: this.onBlur, className: 'x-input', value: displayValue, onChange: this.onChange });
        }
    }]);

    return NumberInput;
}(_react2.default.PureComponent);

NumberInput.displayName = "NumberInput";
NumberInput.propTypes = {
    onChange: _propTypes2.default.func,
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    returnType: _propTypes2.default.string,
    decimals: _propTypes2.default.number,
    isFormat: _propTypes2.default.bool, //是否格式化
    negative: _propTypes2.default.bool, //是否支持负数
    maxLength: _propTypes2.default.number, //长度限制，只作整数部分的长度
    delay: _propTypes2.default.number, //事件延迟时间毫秒
    disabled: _propTypes2.default.bool,
    readOnly: _propTypes2.default.bool
};
NumberInput.defaultProps = {
    returnType: 'Number',
    decimals: 0,
    isFormat: false, //默认不格式化
    negative: true,
    // value: '',
    disabled: false,
    readOnly: false,
    maxLength: 0 //0为不限制
};
exports.default = NumberInput;