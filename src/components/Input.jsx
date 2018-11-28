/*
 * Created with Visual Studio Code.
 * github: https://github.com/React-xui/x-input
 * User: 田想兵
 * Date: 2018-11-27
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 */
import React,{ Component } from "react";
//文本输入框
export class Input extends Component{
    constructor(props){
        super(props);
        this.state={value:props.value||""};
        this.onChangeHandle = this.onChangeHandle.bind(this);
    }
    onChangeHandle(e){
        let {value} = e.target;
        this.setState({value});
        this.props.onChange && this.props.onChange(value);
    }
    render(){
        return (
            <input className={this.props.className+' x-input'} onChange={this.onChangeHandle} value={this.state.value} {...this.props}/>
        )
    }
}

// export class NumericInput extends Component{
//     render(){
//         let reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
//         return <Input reg={reg} />
//     }
// }
const InputContainer = (WrappedComponnet,reg=/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/)=> class extends Component{
    constructor(props){
        super(props);
        this.state={value:props.value||""};
        this.onChangeHandle = this.onChangeHandle.bind(this);
    }
    onChangeHandle(e){
        let {value} = e.target;
        if(!reg || reg.test(value) || value===''){
            this.setState({value});
            this.props.onChange && this.props.onChange(value);
        }
    }
    UNSAFE_componentWillReceiveProps(newProps,newState){
        if(newProps.value != this.state.value){
            this.setState({value:newProps.value});
        }
    }
    render(){
        const newProps ={
            onChange:this.onChangeHandle,
            value:this.state.value
        }
        const props = Object.assign({},this.props,newProps);
        return <WrappedComponnet {...props}/>
    }
}
const NumericInput = InputContainer(Input);//数字
const InterInput = InputContainer(Input,/^-?(0|[1-9][0-9]*)$/);//整数
const PosInterInput = InputContainer(Input,/^(0|[1-9][0-9]*)$/);//正整数
const LetterInput = InputContainer(Input,/^[a-zA-Z]+$/);//正整数

const setCaretPosition=(tObj, sPos)=>{
    if(tObj.setSelectionRange){
        setTimeout(function(){
            tObj.setSelectionRange(sPos, sPos);
            tObj.focus();
        }, 0);
    }else if(tObj.createTextRange){
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
    } else if (element.selectionStart || element.selectionStart == '0') {
        cursorPos = element.selectionStart;
    }
    return cursorPos;
}
const FormatContainer = (WrappedComponnet,format)=> class extends NumericInput{
    onChangeHandle(e){
        let value= formatThousandthNumber(e.target.value.replace(/\,/g,''));
        let target = e.target;
        let len = target.value.length;
        let pos = getPosition(target);
        let rightpos = len-pos;//算出从右计算的光标位置
        this.setState({value},()=>{
            let tmp = this.state.value.length - rightpos
            setCaretPosition(target,tmp)
        })
        // super.onChangeHandle(e);
    }
}

const formatThousandthNumber =  function (number) {
    // number = number.replace(/\,/g,'');
    let arr = String(number).split('.');
    let decimals  = arr.length>1 ?arr[1].length:0;
    if (typeof (number) == undefined) return '';
    if (!number && number !== 0) {
        return '';
    } else {
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        let n = !isFinite(+number) ? 0 : +number,
            prec = decimals,
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
        return s.join(dec);
    }
}
const ThousandInput = FormatContainer(Input,formatThousandthNumber);
export {InputContainer,NumericInput,InterInput,PosInterInput,LetterInput,ThousandInput};
