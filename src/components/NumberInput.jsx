/*
 * @Descripttion: 数字输入框
 * @Author: tianxiangbing
 * @Date: 2020-04-16 18:45:09
 * @LastEditTime: 2020-05-12 18:56:16
 * @github: https://github.com/tianxiangbing
 */
import React from 'react';
import PropTypes from 'prop-types';

//设置光标位置
const setCaretPosition = (tObj, sPos) => {
    if (tObj.setSelectionRange) {
        tObj.setSelectionRange(sPos, sPos);
        tObj.focus();
    } else if (tObj.createTextRange) {
        var rng = tObj.createTextRange();
        rng.move('character', sPos);
        rng.select();
    }
}

//获取当前光标位置
const getPosition = function (element) {
    let cursorPos = 0;
    if (document.selection) {//IE
        var selectRange = document.selection.createRange();
        selectRange.moveStart('character', -element.value.length);
        cursorPos = selectRange.text.length;
    } else if (element && (element.selectionStart || element.selectionStart == '0')) {
        cursorPos = element.selectionStart;
    }
    return cursorPos;
}
export default class NumberInput extends React.PureComponent {
    static displayName = "NumberInput";
    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        returnType: PropTypes.string,
        decimals: PropTypes.number,
        isFormat: PropTypes.bool,//是否格式化
        negative: PropTypes.bool,//是否支持负数
        maxLength: PropTypes.number,//长度限制，只作整数部分的长度
        delay: PropTypes.number,//事件延迟时间毫秒
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        showTitle:PropTypes.bool,//是否展示title
    }
    static defaultProps = {
        returnType: 'Number',
        decimals: 0,
        isFormat: false,//默认不格式化
        negative: true,
        // value: '',
        disabled: false,
        readOnly: false,
        maxLength: 0,//0为不限制
        showTitle:false,
    }
    //千分位
    formatThousandthNumber(num, isAutoZero = false,props=this.props) {
        let { decimals, isFormat } = props;
        if (isNaN(decimals)) {
            //当传入的小数位非数字时，不进行自动补0
            isAutoZero = false;
        }else{
            decimals = +decimals;//转为数字类型 
        }
        if (!isFormat) {
            return num;
        }
        // number = number.replace(/\,/g,'');
        num = String(num).replace(/\,/g, '');
        let isnegative = false;
        if (num.indexOf('-') == 0) {
            num = num.replace(/\-/gi, '');
            isnegative = true;
        }
        let arr = num.split('.');
        let number = arr[0]
        // let decimals  = arr.length>1 ?arr[1].length:0;
        if (typeof (number) == undefined) return '';
        if (!number && number !== 0) {
            return isnegative ? '-' : '';
        } else {
            number =  (number + '').replace(/^0+/g, '0');
            if(/^0\d+/.test(number)){
                number = number.replace(/^0+/g, '');
            }
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            let n = +number,
                prec = 0,
                sep = ',',
                dec = '.',
                s = '';
            s = number.split('.') //(prec ? n.fromFixed(prec) : '' + Math.round(n)).split('.');
            var re = /(-?\d+)(\d{3})/;
            while (re.test(s[0])) {
                s[0] = s[0].replace(re, "$1" + sep + "$2");
            }

            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            let str = s.join(dec);
            //这里根据isAutoZero进行补0，如果已经是小数，则分隔小数位补0，如果是整数，加小数点补
            if (arr.length > 1 && !isNaN(decimals)) {
                //add autozero
                let decnum = arr[1].substr(0, decimals).replace(/[^0-9]/ig, "");
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
            if(str!="" && isAutoZero && +str===0){
                return str;
            }
            if (isnegative) {
                str ='-' + str;
            }
            return str;
        }
    }
    constructor(props) {
        super(props);
        let { value, decimals, defaultValue } = props;
        if (typeof value === 'undefined') {
            if (typeof defaultValue !== 'undefined') {
                value = defaultValue;
            } else {
                value = '';
            }
        }
        this.defaultValue = value;//内置defaultValue为初始值.
        this.state = { value, displayValue: this.formatThousandthNumber(value, true) };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.isFocus = false;//判断是否是当前焦点框 ，用来判断是否需要格式化
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        // console.log('willreceive被调用....')
        // console.log('########', nextProps.value, this.isFocus)
        let { value, decimals } = this.props;
        if (typeof nextProps.value !== 'undefined' && !this.isFocus) {
            //只有在不为undefeined的情况下才处理接受值
            // console.log('########', nextProps.value,nextProps.decimals,decimals)
            if (nextProps.value !== value || decimals !== nextProps.decimals) {
                // if ( nextProps.value !== this.state.value) {
                // console.log(nextProps.value)
                this.changeState(nextProps.value, true, nextProps)
                // }
            }
        }
    }
    //统一返回值
    returnValue(value) {
        let { returnType = 'Number', onChange } = this.props;
        // console.log(value)
        // console.log(returnType)
        let newValue = value;
        if (String(value).length <= 16 && value !== '-' && value !== '') {
            newValue = window[returnType](value);
        }
        // console.log(newValue)
        // onChange && this.debounce( onChange,1000 )(newValue)
        // onChange && onChange(newValue);
        this.newValue = newValue;
        this.debounce(onChange)
    }
    debounce(fn) {
        if (this.props.delay) {
            let now = Date.now();
            !this.timer ? this.timer = setTimeout(() => {
                clearTimeout(this.timer);
                this.timer = null;
                fn && fn(this.newValue);
            }, this.props.delay) : null;
        } else {
            fn && fn(this.newValue);
        }
    }
    onChange(e) {
        // console.log(this.props.readOnly,e.target.value)
        this.isFocus = true;
        if (!this.props.disabled && !this.props.readOnly) {
            let { target } = e;
            let { value } = target;
            let pos = getPosition(target);
            let len = target.value.length;
            let rightpos = len - pos;//算出从右计算的光标位置
            this.changeState(value, false, this.props, (v, dv) => {
                //重置光标位置
                let pos = dv.length - rightpos;
                setCaretPosition(target, pos)
            }, () => {
                this.forceUpdate(() => {
                    setCaretPosition(target, pos - 1);
                })
            });
        }
    }
    onFocus(e) {
        this.isFocus = true;
        // console.log('进了focus')
        this.props.onFocus && this.props.onFocus(e);
    }
    onBlur(e) {
        //在blur里只作补0，然后调用props上的blur
        this.isFocus = false;
        let displayValue = this.formatThousandthNumber(this.state.value, true);
        if (displayValue !== this.state.displayValue) {
            this.setState({ displayValue })
        }
        this.props.onBlur && this.props.onBlur(e);
    }
    onKeyUp(e){
        //k,m判断//keycode 75 k,77 m
        // console.log(e.keyCode)
        this.isFocus= true;
        let value = this.state.value;
        if(value){
            switch(e.keyCode){
                case 75:{
                    value = +value * 1000;
                    break;
                }
                case 77:{
                    value = +value * 1000000;
                    break;
                }
            }
            this.changeState(value,false,this.props);
        }
        this.props.onKeyUp && this.props.onKeyUp(e,this.state.value);
    }
    //统一修改value值
    changeState(value, isAutoZero, props, fn, nofn) {
        let v = String(value).replace(/\,/gi, '');
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
            let integer = v.split('.')[0].replace(/\-/gi, '');
            if (props.maxLength && integer.length > props.maxLength) {
                v = this.state.value;
            }
        }
        let tmp = String(v).split('.');
        let len = tmp.length>1 ?len = tmp[1].length :0;
        //转换为字符串进行比较，先去除逗号
        if (v !== String(this.state.value) || +props.decimals!==len) {
            //这里如果是科学计数了，就以字符串返回
            if (!isNaN(v)) {
                //大于16位则返回字符串，是数字
                let isScience = tmp[0].length > 16;
                if (isScience) {
                    v = String(v);
                }
            }
            let dv = this.formatThousandthNumber(v, isAutoZero,props);
            let oldv = this.state.value;
            v = dv.replace(/\,/gi, '');
            this.setState({ value: v, displayValue: dv }, () => {
                if (oldv === '-') oldv = '';
                if (v === '-') v = '';
                if (oldv !== v) {
                    this.returnValue(v);
                }
                fn && fn(v, dv);
            });
        } else {
            nofn && nofn();
        }
    }
    render() {
        let { displayValue } = this.state;
        let { onClick, disabled, onFocus, readOnly,onMouseEnter,onMouseLeave,showTitle } = this.props;
        let title = showTitle ? displayValue:'';
        return (
            <input title={title} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onKeyUp={this.onKeyUp} onFocus={this.onFocus} type="text" readOnly={readOnly} onClick={onClick} disabled={disabled} onBlur={this.onBlur} className="x-input" value={displayValue} onChange={this.onChange} />
        )
    }
}