/*
 * Created with Visual Studio Code.
 * github: https://github.com/React-xui/x-input
 * User: 田想兵
 * Date: 2018-11-27
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 */
import React, { Component } from "react";
//文本输入框
class Base extends Component {
    constructor(props) {
        super(props);
        this.state = { value: typeof props.value === 'undefined' ? "" : props.value };
        this.onChangeHandle = this.onChangeHandle.bind(this);
    }
    componentWillReceiveProps(newProps, newState) {
        if (typeof newProps.value !== 'undefined' && newProps.value != this.state.value) {
            this.setState({ value: newProps.value });
        }
    }
    onChangeHandle(e) {
        let { value } = e.target;
        let {target} = e;
        this.setState({ value },()=>{
            this.props.onChange && this.props.onChange( target);
        });
    }
    render() {
        let cls = (this.props.className || "") + ' x-input';
        let newProps = { ...this.props };
        delete newProps['className'];
        delete newProps['decimals'];
        delete newProps['onChange'];
        // delete newProps['value'];
        let value = this.state.value;
        typeof value === 'object' ? value = JSON.stringify(value) : null;
        let {multiple} = newProps;
        let props= {onChange:this.onChangeHandle ,...newProps,value} ;
        let tag = multiple ?'textarea':'input';
        // console.log(value,111,newProps)
        return React.createElement(tag,props) 
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
const InputContainer = (WrappedComponnet, reg,negative= false) => class extends Component {
    constructor(props) {
        super(props);
        this.decimals = props.decimals;
        this.negative = this.props.negative || negative;
        this.state = { value: typeof props.value === 'undefined' ? "" : this.format(props.value, true) };
        this.onChangeHandle = this.onChangeHandle.bind(this);
    }
    componentWillReceiveProps(newProps, newState) {
        if (newProps.value != this.state.value && typeof newProps.value !== 'undefined') {
            this.format(newProps.value)
            // this.setState({ value: newProps.value });
        }
    }
    format(value, isinit) {
        let istriggerChange = true;
         if(/^\-/.test(value) && this.negative){
            this.isnegative = true;
        }else{
            this.isnegative = false;
        }
        value = String(value).replace(/-/gi,'')
        if(reg){
            let oldvalue = value;
            typeof value === 'object' ? value = JSON.stringify(value) : null;
            value = String(value).replace(/\,/g, '');
            if (this.state && (oldvalue == this.state.value || value == this.state.value)) {
                istriggerChange = false;
            }
            if (reg && value != '') {
                let arr = value.split('.');
                if (arr.length > 1) {
                    value = arr[0] + '.' + arr[1].substr(0, this.decimals);
                }
                let res = value.match(reg);
                value = res === null ? '' : res[0];
            }
        }
        if(this.isnegative){
            value = '-'+value;
        }
        if (isinit) {
            return value;
        } else {
            this.setState({ value }, () => {
                istriggerChange && this.props.onChange && this.props.onChange(value);
            });
        }
    }
    onChangeHandle(target) {
        let { value } = target;
        this.format(value,false,target);
    }
    render() {
        const newProps = {
            onChange: this.onChangeHandle,
            value: this.state.value
        }
        const props = Object.assign({}, this.props, newProps);
        return <WrappedComponnet {...props} />
    }
}
const Input = InputContainer(Base);
const NumericInput = InputContainer(Base, /-?(0|[1-9][0-9]*)(\.[0-9]*)?/);//数字,含小数
const InterInput = InputContainer(Base, /-?(0|[1-9][0-9]*)?/);//整数
const PosInterInput = InputContainer(Base, /(0|[1-9][0-9]*)/);//正整数
const LetterInput = InputContainer(Base, /[a-zA-Z]+/);//字母

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
        if(/^\-/.test(value)){
            //如果负号开始
            value = value.replace(/\-/gi,'');
            this.negative ? this.isnegative = true:null;
        }else{
            this.isnegative = false;
        }
        this.format(value, false, target);
    }
    format(value, isinit, target) {
        let oldvalue = value;
        value = format(String(value).replace(/\,/g, ''), this.props,this.state ? this.state.value:'',this.negative);
        let istriggerChange = true;
        if (this.state && (oldvalue == this.state.value || value == this.state.value)) {
            istriggerChange = false;
        }
        if (!isinit) {
            //计算出新值和旧值之间相差几个千分位
            let ql = value.split(',').length - this.state.value.split(',').length;
            let rightpos =0;
            if (target) {
                let pos = getPosition(target);
                let len =  target.value.length;
                rightpos = len - pos ;//算出从右计算的光标位置
            }
            // console.log('right:',rightpos)
            if(this.isnegative){
                value ='-'+value;
            }
            this.setState({ value }, () => {
                if (target) {
                    let tmp = this.state.value.length - rightpos
                    // console.log(tmp,this.state.value.length,rightpos)
                    // console.log(tmp)
                    setCaretPosition(target, tmp);
                }
                istriggerChange && this.props.onChange && this.props.onChange(value.replace(/\,/g, ''));
            })
        } else {
            return value;
        }
    }
}

const formatThousandthNumber = function (num, { decimals },ov) {
    // number = number.replace(/\,/g,'');
    num = String(num).replace(/\,/g, '');
    let isnegative = false;
    if(num.indexOf('-')==0){
        num = num.replace(/\-/gi,'');
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
        if(isnegative){
            return '-'+str;
        }
        return str;
    }
}
const ThousandInput = FormatContainer(NumericInput, formatThousandthNumber);
export { Input, InputContainer, NumericInput, InterInput, PosInterInput, LetterInput, ThousandInput };
