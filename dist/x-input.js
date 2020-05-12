(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Dialog"] = factory(require("react"));
	else
		root["Dialog"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Input = __webpack_require__(1);

	var _NumberInput = __webpack_require__(9);

	var _NumberInput2 = _interopRequireDefault(_NumberInput);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/*
	 * Created with Visual Studio Code.
	 * github: https://github.com/React-Plugin/x-seed
	 * User: 田想兵
	 * Date: 2017-05-14
	 * Time: 20:00:00
	 * Contact: 55342775@qq.com
	 */
	module.exports = { NumberInput: _NumberInput2.default, Base: _Input.Base, formatThousandthNumber: _Input.formatThousandthNumber, FormatContainer: _Input.FormatContainer, Input: _Input.Input, NumericInput: _Input.NumericInput, InterInput: _Input.InterInput, PosInterInput: _Input.PosInterInput, LetterInput: _Input.LetterInput, ThousandInput: _Input.ThousandInput, InputContainer: _Input.InputContainer }; //使用module.exports时，从es6到es5生成的dist不会出现export.default的问题.

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ThousandInput = exports.LetterInput = exports.PosInterInput = exports.InterInput = exports.NumericInput = exports.InputContainer = exports.Input = exports.FormatContainer = exports.formatThousandthNumber = exports.Base = undefined;

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};

	var _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];for (var key in source) {
	            if (Object.prototype.hasOwnProperty.call(source, key)) {
	                target[key] = source[key];
	            }
	        }
	    }return target;
	};

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) {
	        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
	    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} /*
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
	            var _this2 = this;

	            var value = e.target.value;
	            var target = e.target;

	            this.setState({ value: value }, function () {
	                _this2.props.onChange && _this2.props.onChange(target);
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var cls = (this.props.className || "") + ' x-input';
	            var newProps = _extends({}, this.props);
	            // delete newProps['className'];
	            delete newProps['decimals'];
	            delete newProps['onChange'];
	            delete newProps['returnType'];
	            delete newProps['negative'];
	            delete newProps['beforeFormat'];
	            delete newProps['batchUpdate'];
	            delete newProps['sync'];
	            // delete newProps['value'];
	            var value = this.state.value;
	            (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' ? value = JSON.stringify(value) : null;
	            var multiple = newProps.multiple;

	            var props = _extends({ onChange: this.onChangeHandle }, newProps, { value: value });
	            var tag = multiple ? 'textarea' : 'input';
	            // console.log(value,111,newProps)
	            return _react2.default.createElement(tag, props);
	            // return (
	            //     <input className={cls} onChange={this.onChangeHandle} value={value}  />
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
	/**
	 * @desc: 格式化输入框
	 * @param {boolean}isNaN 是否为非数字，默认为false时是数字
	 * @return: 
	 */

	var InputContainer = function InputContainer(WrappedComponnet, reg) {
	    var _class, _temp;

	    var negative = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    var isNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	    return _temp = _class = function (_Component2) {
	        _inherits(_class, _Component2);

	        function _class(props) {
	            _classCallCheck(this, _class);

	            // this.decimals = props.decimals;
	            var _this3 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

	            _this3.isNaN = isNumber;
	            _this3.negative = typeof _this3.props.negative === 'undefined' ? negative : _this3.props.negative;
	            var decimals = _this3.props.decimals;
	            if (isNaN(decimals)) {
	                decimals = 0;
	            }
	            _this3.state = { value: typeof props.value === 'undefined' ? "" : number_format(_this3.format(props.value, true), decimals) };
	            _this3.onChangeHandle = _this3.onChangeHandle.bind(_this3);
	            _this3.onBlur = _this3.onBlur.bind(_this3);
	            return _this3;
	        }

	        _createClass(_class, [{
	            key: "componentDidUpdate",
	            value: function componentDidUpdate(prevProps) {
	                if (prevProps.decimals !== this.props.decimals && prevProps.value != '' && this.props.value != "" && this.state.value != "") {
	                    this.blurFormat(this.state.value);
	                }
	            }
	        }, {
	            key: "componentWillReceiveProps",
	            value: function componentWillReceiveProps(newProps, newState) {
	                var _this4 = this;

	                if (newProps.value !== this.state.value && typeof newProps.value !== 'undefined' && newProps.value !== null) {
	                    if (!this.isNaN) {
	                        var value = this.state.value === '' ? '' : Number(String(this.state.value).replace(/\,/gi, ''));
	                        if (Number(String(newProps.value).replace(/\,/gi, '')) !== value) {
	                            // this.format(newProps.value)
	                            this.blurFormat(newProps.value);
	                        }
	                        if (newProps.value === '' && this.state.value !== '') {
	                            this.setState({ value: '' }, function () {
	                                _this4.props.onChange && _this4.props.onChange(_this4.state.value);
	                            });
	                        }
	                    } else {
	                        this.format(newProps.value);
	                    }
	                    // this.setState({ value: newProps.value });
	                }
	            }
	        }, {
	            key: "format",
	            value: function format(value, isinit) {
	                var _this5 = this;

	                if (this.props.beforeFormat) {
	                    value = this.props.beforeFormat(value);
	                }
	                var istriggerChange = true;
	                if (/^\-/.test(value) && this.negative) {
	                    this.isnegative = true;
	                } else {
	                    this.isnegative = false;
	                }
	                value = String(value).replace(/-/gi, '');
	                if (reg) {
	                    var oldvalue = value;
	                    (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' ? value = JSON.stringify(value) : null;
	                    value = String(value).replace(/\,/g, '');
	                    if (reg && value != '') {
	                        var arr = value.split('.');
	                        if (arr.length > 1) {
	                            value = arr[0] + '.' + arr[1].substr(0, this.props.decimals);
	                        }
	                        if (this.props.decimals === 0) {
	                            value = value.split('.')[0];
	                        }
	                        var res = value.match(reg);
	                        value = res === null ? '' : res[0];
	                    }
	                    if (this.state && oldvalue == this.state.value && value == this.state.value) {
	                        istriggerChange = false;
	                    }
	                }
	                if (this.isnegative) {
	                    value = '-' + value;
	                }
	                if (isinit) {
	                    return value;
	                } else {
	                    this.setState({ value: value }, function () {
	                        if (!_this5.isNaN && value != '') {
	                            value = Number(String(value).replace(/\,/gi, ''));
	                        }
	                        _this5.props.returnType ? value = window[_this5.props.returnType](value) : String(value);
	                        istriggerChange && _this5.props.onChange && _this5.props.onChange(value);
	                    });
	                }
	            }
	        }, {
	            key: "onChangeHandle",
	            value: function onChangeHandle(target) {
	                var value = target.value;

	                this.format(value, false, target);
	            }
	        }, {
	            key: "onBlur",
	            value: function onBlur(e) {
	                // console.log(e)
	                if (this.props.autoFormat) {
	                    var value = e.target.value.replace(/\,/gi, '');
	                    if (value === '-' && !this.isNaN) {
	                        value = '';
	                    }
	                    this.blurFormat(value);
	                }
	                this.props.onBlur && this.props.onBlur(e);
	            }
	        }, {
	            key: "blurFormat",
	            value: function blurFormat(value) {
	                var _this6 = this;

	                if (value !== '' && !this.isNaN) {
	                    value = number_format(value, this.props.decimals);
	                }
	                this.setState({ value: value }, function () {
	                    if (!_this6.isNaN && value != '') {
	                        value = Number(String(value).replace(/\,/gi, ''));
	                    }
	                    _this6.props.returnType ? value = window[_this6.props.returnType](value) : String(value);
	                    _this6.props.onChange && _this6.props.onChange(value);
	                });
	            }
	        }, {
	            key: "render",
	            value: function render() {
	                var newProps = {
	                    onChange: this.onChangeHandle,
	                    value: this.state.value
	                };
	                var props = _extends({}, this.props, newProps);
	                delete props.autoFormat;
	                return _react2.default.createElement(WrappedComponnet, _extends({}, props, { onBlur: this.onBlur }));
	            }
	        }]);

	        return _class;
	    }(_react.Component), _class.defaultProps = {
	        autoFormat: true
	    }, _class.propTypes = {
	        decimals: _propTypes2.default.number
	    }, _temp;
	};
	function number_format(number) {
	    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    if (number === '') return '';
	    if (!isNaN(n)) {
	        n = Number(n);
	        number = String(number);
	        var num = number;
	        var arr = number.split('.');
	        var i = (arr[0] + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
	        if (number.indexOf('.') > -1 && n != 0) {
	            var de = arr[1];
	            num = i + '.' + (de + Array(n + 1).join(0)).slice(0, n);
	        } else {
	            num = i + '.' + Array(n + 1).join(0).slice(0, n);
	        }
	        if (n == 0) {
	            num = i;
	        }
	        return num;
	    }
	    return number;
	}
	var Input = InputContainer(Base);
	var NumericInput = InputContainer(Base, /-?(0|[1-9][0-9]*)(\.[0-9]*)?/, true, false); //数字,含小数
	var InterInput = InputContainer(Base, /-?(0|[1-9][0-9]*)?/, true, false); //整数
	var PosInterInput = InputContainer(Base, /(0|[1-9][0-9]*)/, false, false); //正整数
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
	    var _class2, _temp2;

	    return _temp2 = _class2 = function (_NumericInput) {
	        _inherits(_class2, _NumericInput);

	        function _class2() {
	            _classCallCheck(this, _class2);

	            return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
	        }

	        _createClass(_class2, [{
	            key: "onChangeHandle",
	            value: function onChangeHandle(target) {
	                var value = target.value;
	                // if(this.negative){
	                //     if(value =='-' ){
	                //         return value;
	                //     }
	                // }else{
	                //     return ''
	                // }

	                if (/^\-/.test(value)) {
	                    //如果负号开始
	                    value = value.replace(/\-/i, '');
	                    this.negative ? this.isnegative = true : null;
	                } else {
	                    this.isnegative = false;
	                }
	                // if(value!="" || this.isnegative){
	                this.format(value, false, target);
	                // }
	                // else{
	                //     this.props.onChange && this.props.onChange(value);
	                // }
	            }
	        }, {
	            key: "format",
	            value: function format(value, isinit, target) {
	                var _this8 = this;

	                if (this.props.beforeFormat) {
	                    value = this.props.beforeFormat(value);
	                }
	                var oldvalue = value;
	                value = _format(String(value).replace(/\,/g, ''), this.props, this.state ? this.state.value : '', this.negative);
	                var istriggerChange = true;
	                if (this.state && (oldvalue == this.state.value || value == this.state.value)) {
	                    istriggerChange = false;
	                }
	                if (!isinit) {
	                    //计算出新值和旧值之间相差几个千分位
	                    var ql = value.split(',').length - String(this.state.value).split(',').length;
	                    var rightpos = 0;
	                    if (target) {
	                        var pos = getPosition(target);
	                        var len = target.value.length;
	                        rightpos = len - pos; //算出从右计算的光标位置
	                    }
	                    // console.log('right:',rightpos)
	                    if (this.isnegative && String(value).indexOf('-') != 0) {
	                        value = '-' + value;
	                    }
	                    this.setState({ value: value }, function () {
	                        if (target) {
	                            var tmp = String(_this8.state.value).length - rightpos;
	                            // console.log(tmp,this.state.value.length,rightpos)
	                            // console.log(tmp)
	                            setCaretPosition(target, tmp);
	                        }
	                        if (!_this8.isNaN && value != '' && value != "-") {
	                            value = Number(value.replace(/\,/gi, ''));
	                        } else {
	                            value = value.replace(/\,/gi, '');
	                        }
	                        _this8.props.returnType ? value = window[_this8.props.returnType](value) : String(value);
	                        if (!_this8.isNaN && value === '-') {
	                            return;
	                        }
	                        istriggerChange && _this8.props.onChange && _this8.props.onChange(value);
	                    });
	                } else {
	                    return value;
	                }
	            }
	        }]);

	        return _class2;
	    }(NumericInput), _class2.displayName = "HOC(" + getDisplayName(WrappedComponnet) + ")", _temp2;
	};

	var formatThousandthNumber = function formatThousandthNumber(num, _ref, ov) {
	    var _ref$decimals = _ref.decimals,
	        decimals = _ref$decimals === undefined ? 0 : _ref$decimals;

	    // number = number.replace(/\,/g,'');
	    ov = String(ov).replace(/\,/g, '');
	    num = String(num).replace(/\,/g, '');
	    var isnegative = false;
	    if (num.indexOf('-') == 0) {
	        num = num.replace(/\-/gi, '');
	        isnegative = true;
	    }
	    var arr = num.split('.');
	    var number = arr[0];
	    // let decimals  = arr.length>1 ?arr[1].length:0;
	    if ((typeof number === "undefined" ? "undefined" : _typeof(number)) == undefined) return '';
	    if (!number && number !== 0) {
	        return '';
	    } else {
	        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
	        var n = !isFinite(+number) ? ov : +number,
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
	        if (decimals === 0) {
	            str = str.split('.')[0];
	        }
	        if (isnegative) {
	            return '-' + str;
	        }
	        return str;
	    }
	};
	var ThousandInput = FormatContainer(NumericInput, formatThousandthNumber);
	Input.Numeric = NumericInput;
	Input.Inter = InterInput;
	Input.PosInter = PosInterInput;
	Input.Letter = LetterInput;
	Input.Thousand = ThousandInput;
	Input.Base = Base;
	Input.FormatContainer = FormatContainer;
	exports.Base = Base;
	exports.formatThousandthNumber = formatThousandthNumber;
	exports.FormatContainer = FormatContainer;
	exports.Input = Input;
	exports.InputContainer = InputContainer;
	exports.NumericInput = NumericInput;
	exports.InterInput = InterInput;
	exports.PosInterInput = PosInterInput;
	exports.LetterInput = LetterInput;
	exports.ThousandInput = ThousandInput;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if ((undefined) !== 'production') {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(4)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(8)();
	}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var assign = __webpack_require__(5);

	var ReactPropTypesSecret = __webpack_require__(6);
	var checkPropTypes = __webpack_require__(7);

	var printWarning = function() {};

	if ((undefined) !== 'production') {
	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if ((undefined) !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error(
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if ((undefined) !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            printWarning(
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      (undefined) !== 'production' ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      (undefined) !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning(
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
	        );
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var printWarning = function() {};

	if ((undefined) !== 'production') {
	  var ReactPropTypesSecret = __webpack_require__(6);
	  var loggedTypeFailures = {};

	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if ((undefined) !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error(
	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
	            );
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning(
	            (componentName || 'React class') + ': type specification of ' +
	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
	            'You may have forgotten to pass an argument to the type checker ' +
	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
	            'shape all require an argument).'
	          )

	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          printWarning(
	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
	          );
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = __webpack_require__(6);

	function emptyFunction() {}

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) {
	        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
	    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} /*
	   * @Descripttion: 数字输入框
	   * @Author: tianxiangbing
	   * @Date: 2020-04-16 18:45:09
	   * @LastEditTime: 2020-05-12 18:07:48
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
	            var _props = this.props,
	                value = _props.value,
	                decimals = _props.decimals;

	            if (typeof nextProps.value !== 'undefined' && !this.isFocus) {
	                //只有在不为undefeined的情况下才处理接受值
	                // console.log('########', nextProps.value,nextProps.decimals,decimals)
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
	            this.props.onKeyUp && this.props.onKeyUp(e, this.state.value);
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
	            var tmp = String(v).split('.');
	            var len = tmp.length > 1 ? len = tmp[1].length : 0;
	            //转换为字符串进行比较，先去除逗号
	            if (v !== String(this.state.value) || +props.decimals !== len) {
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
	            var _props3 = this.props,
	                onClick = _props3.onClick,
	                disabled = _props3.disabled,
	                onFocus = _props3.onFocus,
	                readOnly = _props3.readOnly,
	                onMouseEnter = _props3.onMouseEnter,
	                onMouseLeave = _props3.onMouseLeave;

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

/***/ })
/******/ ])
});
;