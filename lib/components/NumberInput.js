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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @LastEditTime: 2020-04-30 16:25:56
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
                return '';
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
                if (arr.length > 1) {
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
            decimals = props.decimals;

        _this.state = { value: value, displayValue: _this.formatThousandthNumber(value, true) };
        _this.onChange = _this.onChange.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        return _this;
    }

    _createClass(NumberInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // console.log('willreceive被调用....')
            // console.log('########', nextProps.value, nextProps.negative)
            var value = this.props.value;

            if (nextProps.value !== value || nextProps.value !== this.state.value) {
                // console.log(nextProps.value)
                this.changeState(nextProps.value, true, nextProps);
            }
        }
        //统一返回值

    }, {
        key: 'returnValue',
        value: function returnValue(value) {
            var _props2 = this.props,
                _props2$returnType = _props2.returnType,
                returnType = _props2$returnType === undefined ? 'Number' : _props2$returnType,
                onChange = _props2.onChange;
            // console.log(value)
            // console.log(returnType)

            var newValue = value;
            if (String(value).length <= 16) {
                newValue = window[returnType](value);
            }
            // console.log(newValue)
            onChange && onChange(newValue);
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var _this2 = this;

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
                _this2.forceUpdate(function () {
                    setCaretPosition(target, pos - 1);
                });
            });
        }
    }, {
        key: 'onBlur',
        value: function onBlur(e) {
            //在blur里只作补0，然后调用props上的blur
            var displayValue = this.formatThousandthNumber(this.state.value, true);
            if (displayValue !== this.state.displayValue) {
                this.setState({ displayValue: displayValue });
            }
            this.props.onBlur && this.props.onBlur(e);
        }
        //统一修改value值

    }, {
        key: 'changeState',
        value: function changeState(value, isAutoZero, props, fn, nofn) {
            var _this3 = this;

            var v = String(value).replace(/\,/gi, '');
            //如果不支持负数，去掉负号
            if (!props.negative) {
                v = v.replace(/\-/gi, '');
            }
            //判断是否为数字，不是则为上一次的值
            if (isNaN(v)) {
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
                if (!isNaN(v)) {
                    //大于16位则返回字符串，是数字
                    var tmp = String(v).split('.');
                    var isScience = tmp[0].length > 16;
                    if (isScience) {
                        v = String(v);
                    }
                }
                var dv = this.formatThousandthNumber(v, isAutoZero);
                this.setState({ value: v, displayValue: dv }, function () {
                    _this3.returnValue(v);
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

            return _react2.default.createElement('input', { type: 'text', onBlur: this.onBlur, className: 'x-input', value: displayValue, onChange: this.onChange });
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
    maxLength: _propTypes2.default.number //长度限制，只作整数部分的长度
};
NumberInput.defaultProps = {
    returnType: 'Number',
    decimals: 0,
    isFormat: false, //默认不格式化
    negative: true,
    value: '',
    maxLength: 0 //0为不限制
};
exports.default = NumberInput;