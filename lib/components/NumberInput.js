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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @LastEditTime: 2020-12-31 15:11:26
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
            var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props;
            var decimals = props.decimals,
                isFormat = props.isFormat;
            //如果传入参数isAutoZero为false，则固定不补0;

            this.props.isAutoZero === false ? isAutoZero = false : null;
            if (isNaN(decimals)) {
                //当传入的小数位非数字时，不进行自动补0
                isAutoZero = false;
            } else {
                decimals = +decimals; //转为数字类型 
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
                number = (number + '').replace(/^0+/g, '0');
                if (/^0\d+/.test(number)) {
                    number = number.replace(/^0+/g, '');
                }
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
                if (str != "" && isAutoZero && +str === 0) {
                    return str;
                }
                if (isnegative) {
                    str = '-' + str;
                }
                return str;
            }
        }
    }]);

    function NumberInput(props) {
        _classCallCheck(this, NumberInput);

        var _this2 = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props));

        _this2.compositionend = function (e) {
            // console.log('end')
            _this2.cpLock = false;
            _this2.onChange(e);
        };

        _this2.compositionstart = function () {
            // console.log('start')
            _this2.cpLock = true;
            // this.node.blur();
            // this.node.focus();
        };

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
        _this2.defaultValue = value; //内置defaultValue为初始值.
        _this2.state = { value: value, displayValue: _this2.formatThousandthNumber(value, true) };
        _this2.onChange = _this2.onChange.bind(_this2);
        _this2.onBlur = _this2.onBlur.bind(_this2);
        _this2.onFocus = _this2.onFocus.bind(_this2);
        _this2.isFocus = false; //判断是否是当前焦点框 ，用来判断是否需要格式化
        _this2.onKeyUp = _this2.onKeyUp.bind(_this2);
        _this2.node = _react2.default.createRef();
        _this2.onStep = _this2.onStep.bind(_this2);
        // this.onInput = this.onInput.bind(this);
        return _this2;
    }

    _createClass(NumberInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // console.log('willreceive被调用....')
            // console.log('########', nextProps.value, this.isFocus)
            var _props = this.props,
                value = _props.value,
                decimals = _props.decimals;

            if (typeof nextProps.value !== 'undefined') {
                //只有在不为undefeined的情况下才处理接受值
                // console.log('########', nextProps.value,nextProps.decimals,decimals)
                if (nextProps.value !== value || decimals !== nextProps.decimals) {
                    if (nextProps.value !== this.getReturnValue(this.state.value) || decimals !== nextProps.decimals) {
                        // if ( nextProps.value !== this.state.value) {
                        // console.log(nextProps.value)
                        if (this.checkMaxMin(nextProps.value, null, nextProps)) {
                            this.changeState(nextProps.value, true, nextProps);
                        }
                        // this.checkMaxMin(nextProps.value,null,nextProps)
                        // }
                    }
                }
            }
        }
        //统一返回值

    }, {
        key: 'returnValue',
        value: function returnValue(value) {
            // console.log(newValue)
            // onChange && this.debounce( onChange,1000 )(newValue)
            // onChange && onChange(newValue);
            var onChange = this.props.onChange;
            // console.log('vvvvv',value)

            this.newValue = this.getReturnValue(value);
            // console.log('进入change',this.newValue)
            //changeEvent为change时触发
            this.props.changeEvent === 'change' && this.debounce(onChange);
        }
    }, {
        key: 'getReturnValue',
        value: function getReturnValue(value) {
            var _props2 = this.props,
                _props2$returnType = _props2.returnType,
                returnType = _props2$returnType === undefined ? 'Number' : _props2$returnType,
                onChange = _props2.onChange;
            // console.log(value)
            // console.log(returnType)

            var newValue = value;
            if (String(value).length <= 16 && value !== '-' && value !== '') {
                newValue = window[returnType](value);
            }
            if (value === '-') {
                newValue = '';
            }
            return newValue;
        }
    }, {
        key: 'debounce',
        value: function debounce(fn) {
            var _this3 = this;

            if (this.props.delay) {
                var now = Date.now();
                var _this = this;
                !this.timer ? this.timer = setTimeout(function () {
                    // console.log('delay...',_this.newValue)
                    clearTimeout(_this.timer);
                    _this.timer = null;
                    fn && fn.call(_this3, _this.newValue);
                }, this.props.delay) : null;
            } else {
                fn && fn.call(this, this.newValue);
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var _this4 = this;

            // console.log(this.cpLock,e.target.value)
            if (this.cpLock) {
                //拼音输入法,直接展示
                this.setState({ displayValue: e.target.value });
                return false;
            }
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
                    _this4.forceUpdate(function () {
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
        key: 'checkMaxMin',
        value: function checkMaxMin(value, fn) {
            var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props;

            var num = Number(value);
            var _props3 = this.props,
                max = _props3.max,
                min = _props3.min;

            if (num < min) {
                this.changeState(min, true, props, fn);
                return false;
            }
            if (num > max) {
                this.changeState(max, true, props, fn);
                return false;
            }
            fn && fn();
            return true;
        }
    }, {
        key: 'onBlur',
        value: function onBlur(e) {
            var _this5 = this;

            this.cpLock = false;
            this.timer && clearTimeout(this.timer);
            //判断max和min范围
            this.checkMaxMin(this.state.value, function () {
                //在blur里只作补0，然后调用props上的blur
                _this5.isFocus = false;
                var displayValue = _this5.formatThousandthNumber(_this5.state.value, true);
                if (displayValue !== _this5.state.displayValue) {
                    _this5.setState({ displayValue: displayValue });
                }
                var rv = _this5.getReturnValue(_this5.state.value);
                _this5.props.onChange && _this5.props.onChange.call(_this5, rv);
                _this5.props.onBlur && _this5.props.onBlur.call(_this5, e, rv);
            });
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(e) {
            //k,m判断//keycode 75 k,77 m
            // console.log(e.keyCode)
            this.isFocus = true;
            var value = this.state.value;
            if (value && (e.keyCode == 75 || e.keyCode == 77)) {
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
            this.props.onKeyUp && this.props.onKeyUp(e, this.state.value);
        }
        //统一修改value值

    }, {
        key: 'changeState',
        value: function changeState(value, isAutoZero, props, fn, nofn) {
            var _this6 = this;

            var v = String(value).replace(/[\,\+]/gi, '');
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
            var tmp = String(v).split('.');
            var len = tmp.length > 1 ? len = tmp[1].length : 0;
            //转换为字符串进行比较，先去除逗号
            var odv = String(this.state.displayValue).replace(/\,/gi, '');
            if (v !== String(this.state.value) || +props.decimals !== len || String(this.state.value) !== odv) {
                //这里如果是科学计数了，就以字符串返回
                if (!isNaN(v)) {
                    //大于16位则返回字符串，是数字
                    var isScience = tmp[0].length > 16;
                    if (isScience) {
                        v = String(v);
                    }
                }
                var dv = this.formatThousandthNumber(v, isAutoZero, props);
                var oldv = this.state.value;
                v = dv.replace(/\,/gi, '');
                this.setState({ value: v, displayValue: dv }, function () {
                    if (oldv === '-') oldv = '';
                    if (v === '-') v = '';
                    // console.log(oldv,v)
                    if (oldv !== v) {
                        _this6.returnValue(v);
                    }
                    fn && fn(v, dv);
                });
            } else {
                nofn && nofn();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.cpLock = false;
            this.node.addEventListener('compositionstart', this.compositionstart);
            this.node.addEventListener('compositionend', this.compositionend);
            // this.node.addEventListener('compositionstart', ()=> {
            //     this.cpLock = true;
            //     // console.log('中文输入开始');
            // })
            // this.node.addEventListener('compositionend', ()=> {
            //     this.cpLock = false;
            //     // console.log('中文输入结束');
            // })
            // this.node.addEventListener('blur', ()=> {
            //     this.cpLock = false;
            //     console.log('中文输入结束');
            // })
            // this.node.addEventListener('input',this.onInput)
        }
    }, {
        key: 'componentWillUnmount',

        // compositionupdate=()=>{
        //     // console.log('update')
        // }
        // onInput=(e)=>{
        //     // console.log('input',this.cpLock)
        //     !this.cpLock &&this.onChange(e);
        // }
        value: function componentWillUnmount() {
            // this.node.removeEventListener('input', this.onChange);
            this.node.removeEventListener('compositionend', this.compositionend);
            // this.node.removeEventListener('compositionupdate', this.compositionupdate);
            this.node.removeEventListener('compositionstart', this.compositionstart);
        }
        //微调点击

    }, {
        key: 'onStep',
        value: function onStep(type, event) {
            var _props4 = this.props,
                disabled = _props4.disabled,
                readOnly = _props4.readOnly;

            if (disabled || readOnly) {
                //只读
                return false;
            }
            // this.node.focus();
            var value = Number(this.state.value);
            var _props$step = this.props.step,
                step = _props$step === undefined ? 0 : _props$step;

            if (type === 'up') {
                value += Number(step);
            } else {
                value -= Number(step);
            }
            // let displayValue = this.formatThousandthNumber(value, true);
            // if (displayValue !== this.state.displayValue) {
            //     this.setState({ displayValue })
            // }
            // this.isFocus =false;
            if (this.checkMaxMin(value)) {
                this.changeState(value, true, this.props);
            }
            this.props.onStep && this.props.onStep(value, { offset: step, type: type });
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            var _this7 = this;

            var displayValue = this.state.displayValue;
            var _props5 = this.props,
                onClick = _props5.onClick,
                disabled = _props5.disabled,
                onFocus = _props5.onFocus,
                readOnly = _props5.readOnly,
                onMouseEnter = _props5.onMouseEnter,
                onMouseLeave = _props5.onMouseLeave,
                showTitle = _props5.showTitle,
                className = _props5.className,
                placeholder = _props5.placeholder,
                autoFocus = _props5.autoFocus;

            var title = showTitle ? displayValue : '';
            var cls = className + ' x-input';
            if (this.props.spinner) {
                var spinnerCls = 'x-input-step';
                if (disabled || readOnly) {
                    spinnerCls += ' disabled';
                }
                //打开微调器
                return _react2.default.createElement(
                    'div',
                    { className: 'x-input-container' },
                    _react2.default.createElement('input', {
                        ref: function ref(_ref) {
                            return _this7.node = _ref;
                        },
                        className: cls,
                        title: title,
                        onMouseEnter: onMouseEnter,
                        onMouseLeave: onMouseLeave,
                        onKeyUp: this.onKeyUp,
                        onFocus: this.onFocus,
                        type: 'text',
                        readOnly: readOnly,
                        onClick: onClick,
                        disabled: disabled,
                        onBlur: this.onBlur,
                        value: displayValue,
                        onChange: this.onChange,
                        placeholder: placeholder,
                        autoFocus: autoFocus
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: spinnerCls },
                        _react2.default.createElement(
                            'span',
                            { className: 'x-input-step-up', onClick: this.onStep.bind(this, 'up') },
                            _react2.default.createElement('i', null)
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'x-input-step-down', onClick: this.onStep.bind(this, 'down') },
                            _react2.default.createElement('i', null)
                        )
                    )
                );
            } else {
                return _react2.default.createElement('input', {
                    ref: function ref(_ref2) {
                        return _this7.node = _ref2;
                    },
                    className: cls,
                    title: title,
                    onMouseEnter: onMouseEnter,
                    onMouseLeave: onMouseLeave,
                    onKeyUp: this.onKeyUp,
                    onFocus: this.onFocus,
                    type: 'text',
                    readOnly: readOnly,
                    onClick: onClick,
                    disabled: disabled,
                    onBlur: this.onBlur,
                    value: displayValue,
                    onChange: this.onChange,
                    placeholder: placeholder,
                    autoFocus: autoFocus
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return this.renderInput();
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
    formatEvent: _propTypes2.default.string, //格式化的事件
    negative: _propTypes2.default.bool, //是否支持负数
    maxLength: _propTypes2.default.number, //长度限制，只作整数部分的长度
    delay: _propTypes2.default.number, //事件延迟时间毫秒
    disabled: _propTypes2.default.bool,
    readOnly: _propTypes2.default.bool,
    showTitle: _propTypes2.default.bool, //是否展示title
    className: _propTypes2.default.string,
    changeEvent: _propTypes2.default.string,
    isAutoZero: _propTypes2.default.bool,
    spinner: _propTypes2.default.bool,
    max: _propTypes2.default.number,
    min: _propTypes2.default.number,
    step: _propTypes2.default.number,
    onStep: _propTypes2.default.func
};
NumberInput.defaultProps = {
    returnType: 'Number',
    decimals: 0,
    isFormat: true, //默认不格式化
    formatEvent: 'change',
    negative: true,
    // value: '',
    disabled: false,
    readOnly: false,
    maxLength: 0, //0为不限制
    showTitle: false,
    className: '',
    changeEvent: 'change',
    isAutoZero: true,
    spinner: false,
    max: Number.MAX_SAFE_INTEGER,
    min: Number.MIN_SAFE_INTEGER,
    step: 1 };
exports.default = NumberInput;