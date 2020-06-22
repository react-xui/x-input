/*
 * Created with Visual Studio Code.
 * github: https://github.com/React-xui/x-input
 * User: 田想兵
 * Date: 2018-11-27
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
//文本输入框
class Base extends Component {
    constructor(props) {
        super(props);
        this.state = { value: typeof props.value === 'undefined' ? "" : props.value };
        this.onChangeHandle = this.onChangeHandle.bind(this);
    }
    componentWillReceiveProps(newProps, newState) {
        if (typeof newProps.value !== 'undefined' && newProps.value != this.state.value ) {
            this.setState({ value: newProps.value });
        }
    }
    onChangeHandle(e) {
        let { value } = e.target;
        let { target } = e;
        this.setState({ value }, () => {
            this.props.onChange && this.props.onChange(target);
        });
    }
    render() {
        let cls = (this.props.className || "") + ' x-input';
        let newProps = { ...this.props };
        // delete newProps['className'];
        delete newProps['decimals'];
        delete newProps['onChange'];
        delete newProps['returnType'];
        delete newProps['negative']; 
        delete newProps['beforeFormat']; 
        delete newProps['batchUpdate']; 
        delete newProps['sync']; 
        // delete newProps['value'];
        let value = this.state.value;
        typeof value === 'object' ? value = JSON.stringify(value) : null;
        let { multiple } = newProps;
        let props = { onChange: this.onChangeHandle, ...newProps, value };
        let tag = multiple ? 'textarea' : 'input';
        // console.log(value,111,newProps)
        return React.createElement(tag, props)
        // return (
        //     <input className={cls} onChange={this.onChangeHandle} value={value}  />
        // )
    }
}

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
const InputContainer = (WrappedComponnet, reg, negative = false, isNumber = true) => class extends Component {
    isNaN = isNumber;
    static defaultProps={
        autoFormat:true
    }
    static propTypes = {
        decimals:PropTypes.number
    }
    constructor(props) {
        super(props);
        // this.decimals = props.decimals;
        this.negative = typeof this.props.negative==='undefined'? negative:this.props.negative;
        let decimals = this.props.decimals;
        if(isNaN(decimals)){
            decimals = 0;
        }
        this.state = { value: typeof props.value === 'undefined' ? "" : number_format(this.format(props.value, true),decimals) };
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    componentDidUpdate(prevProps){
        if(prevProps.decimals!==this.props.decimals && prevProps.value!='' && this.props.value !="" && this.state.value!=""){
            this.blurFormat(this.state.value) 
        }
    }
    componentWillReceiveProps(newProps, newState) {
        if (newProps.value !== this.state.value && typeof newProps.value !== 'undefined' && newProps.value!==null) {
            if (!this.isNaN) {
                let value =this.state.value ===''?'': Number(String(this.state.value).replace(/\,/gi, ''));
                if (Number(String(newProps.value).replace(/\,/gi, '')) !== value) {
                    // this.format(newProps.value)
                    this.blurFormat(newProps.value);
                }
                if(newProps.value ==='' && this.state.value  !==''){
                    this.setState({value:''},()=>{
                        this.props.onChange && this.props.onChange(this.state.value)
                    })
                }
            } else {
                this.format(newProps.value)
            }
            // this.setState({ value: newProps.value });
        }
    }
    format(value, isinit) {
        if(this.props.beforeFormat){
            value = this.props.beforeFormat(value);
        }
        let istriggerChange = true;
        if (/^\-/.test(value) && this.negative) {
            this.isnegative = true;
        } else {
            this.isnegative = false;
        }
        value = String(value).replace(/-/gi, '')
        if (reg) {
            let oldvalue = value;
            typeof value === 'object' ? value = JSON.stringify(value) : null;
            value = String(value).replace(/\,/g, '');
            if (reg && value != '') {
                let arr = value.split('.');
                if (arr.length > 1) {
                    value = arr[0] + '.' + arr[1].substr(0, this.props.decimals);
                }
                if(this.props.decimals ===0){
                    value = value.split('.')[0];
                }
                let res = value.match(reg);
                value = res === null ? '' : res[0];
            }
            if (this.state && (oldvalue == this.state.value && value == this.state.value)) {
                istriggerChange = false;
            }
        }
        if (this.isnegative) {
            value = '-' + value;
        }
        if (isinit) {
            return value;
        } else {
            this.setState({ value }, () => {
                if (!this.isNaN && value !='') {
                    value = Number(String(value).replace(/\,/gi, ''));
                }
                this.props.returnType ? value = window[this.props.returnType](value) : String(value);
                istriggerChange && this.props.onChange && this.props.onChange(value);
            });
        }
    }
    onChangeHandle(target) {
        let { value } = target;
        this.format(value, false, target);
    }
    onBlur(e){
        // console.log(e)
        if(this.props.autoFormat){
           let value = e.target.value.replace(/\,/gi,'');
           if(value ==='-' && !this.isNaN){
               value = '';
           }
           this.blurFormat(value);
        }
        this.props.onBlur && this.props.onBlur(e);
    }
    blurFormat(value){
        if(value!=='' && !this.isNaN){
            value = number_format(value,this.props.decimals)
        }
        this.setState({ value }, () => {
            if (!this.isNaN && value !='') {
                value = Number(String(value).replace(/\,/gi, ''));
            }
            this.props.returnType ? value = window[this.props.returnType](value) : String(value);
            this.props.onChange && this.props.onChange(value);
       });
    }
    render() {
        const newProps = {
            onChange: this.onChangeHandle,
            value: this.state.value
        }
        const props = Object.assign({}, this.props, newProps);
        delete props.autoFormat;
        return <WrappedComponnet {...props}  onBlur={this.onBlur}/>
    }
}
function number_format(number,n=0){
    if(number==='')return '';
    if(!isNaN(n)){
        n = Number(n)
        number = String(number);
        let num= number;
        let arr = number.split('.');
        let i = (arr[0] +'').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
        if(number.indexOf('.')>-1 && n !=0){
            let de = arr[1]
            num =  i+'.'+ (de+Array(n+1).join(0)).slice(0,n);
        }else{
            num =  i+'.'+ Array(n+1).join(0).slice(0,n);
        }
        if(n == 0){
            num = i;
        }
        return num
    }
    return number;
}
class Input extends Base {
    onChangeHandle(e) {
        let { value } = e.target;
        let { target } = e;
        this.setState({ value }, () => {
            this.props.onChange && this.props.onChange(value);
        });
    }
}
var NumericInput = InputContainer(Base, /-?(0|[1-9][0-9]*)(\.[0-9]*)?/,true,false); //数字,含小数
var InterInput = InputContainer(Base, /-?(0|[1-9][0-9]*)?/,true,false); //整数
var PosInterInput = InputContainer(Base, /(0|[1-9][0-9]*)/,false,false); //正整数
var LetterInput = InputContainer(Base, /[a-zA-Z]+/); //字母

const setCaretPosition = (tObj, sPos) => {
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
//getDisplayName
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Component'
}
const FormatContainer = (WrappedComponnet, format) => class extends NumericInput {
    static displayName = `HOC(${getDisplayName(WrappedComponnet)})`
    onChangeHandle(target) {
        let { value } = target;
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
    format(value, isinit, target) {
        if(this.props.beforeFormat){
            value = this.props.beforeFormat(value);
        }
        let oldvalue = value;
        value = format(String(value).replace(/\,/g, ''), this.props, this.state ? this.state.value : '', this.negative);
        let istriggerChange = true;
        if (this.state && (oldvalue == this.state.value || value == this.state.value)) {
            istriggerChange = false;
        }
        if (!isinit) {
            //计算出新值和旧值之间相差几个千分位
            let ql = value.split(',').length - String(this.state.value).split(',').length;
            let rightpos = 0;
            if (target) {
                let pos = getPosition(target);
                let len = target.value.length;
                rightpos = len - pos;//算出从右计算的光标位置
            }
            // console.log('right:',rightpos)
            if (this.isnegative&& String(value).indexOf('-')!=0) {
                value = '-' + value;
            }
            this.setState({ value }, () => {
                if (target) {
                    let tmp = String(this.state.value).length - rightpos
                    // console.log(tmp,this.state.value.length,rightpos)
                    // console.log(tmp)
                    setCaretPosition(target, tmp);
                }
                if (!this.isNaN && value !='' && value!="-") {
                    value = Number(value.replace(/\,/gi, ''));
                }else {
                    value = value.replace(/\,/gi, '');
                }
                this.props.returnType ? value = window[this.props.returnType](value) : String(value);
                if(!this.isNaN && value ==='-'){
                    return;
                }
                istriggerChange && this.props.onChange && this.props.onChange(value);
            })
        } else {
            return value;
        }
    }
}

const formatThousandthNumber = function (num, { decimals=0 }, ov) {
    // number = number.replace(/\,/g,'');
    ov=String(ov).replace(/\,/g, '');
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
        return '';
    } else {
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        let n = !isFinite(+number) ? ov : +number,
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
        let str = s.join(dec);
        if (arr.length > 1) {
            str += '.' + arr[1].substr(0, decimals).replace(/[^0-9]/ig, "");
        }
        if(decimals ===0){
            str = str.split('.')[0];
        }
        if (isnegative) {
            return '-' + str;
        }
        return str;
    }
}
const ThousandInput = FormatContainer(NumericInput, formatThousandthNumber);
Input.Numeric = NumericInput;
Input.Inter = InterInput;
Input.PosInter = PosInterInput;
Input.Letter = LetterInput;
Input.Thousand = ThousandInput;
Input.Base=Base;
Input.FormatContainer=FormatContainer;
export {Base,formatThousandthNumber,FormatContainer, Input, InputContainer, NumericInput, InterInput, PosInterInput, LetterInput, ThousandInput };
