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
        this.props.onChange && this.props.onChange(e,value);
    }
    render(){
        let cls = (this.props.className||"") + ' x-input';
        let newProps = {...this.props};
        delete newProps['className'];
        delete newProps['decimals'];
        delete newProps['onChange'];
        return (
            <input className={cls} onChange={this.onChangeHandle} value={this.state.value} {...newProps}/>
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
        this.decimals = props.decimals;
        this.onChangeHandle = this.onChangeHandle.bind(this);
    }
    onChangeHandle(e){
        let {value} = e.target;
        let arr = value.split('.');
        if(arr.length >1 ){
            value = arr[0] +'.'+ arr[1].substr(0,this.decimals);
        }
       
        if( !reg || reg.test(value) || value===''){
            this.setState({value},()=>{
                this.props.onChange && this.props.onChange(value);
            });
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
    onChangeHandle(e,v){
        let value= format(e.target.value.replace(/\,/g,''),this.props);
        let target = e.target;
        let len = target.value.length;
        let pos = getPosition(target);
        let rightpos = len-pos;//算出从右计算的光标位置
        this.setState({value},()=>{
            let tmp = this.state.value.length - rightpos
            setCaretPosition(target,tmp);
            this.props.onChange && this.props.onChange(value);
        })
    }
}

const formatThousandthNumber =  function (num,{decimals}) {
    // number = number.replace(/\,/g,'');
    num =String(num);
    let arr = num.split('.');
    let number = arr[0]
    // let decimals  = arr.length>1 ?arr[1].length:0;
    if (typeof (number) == undefined) return '';
    if (!number && number !== 0) {
        return '';
    } else {
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        let n = !isFinite(+number) ? 0 : +number,
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
        if(arr.length>1){
            str +='.'+ arr[1].substr(0,decimals).replace(/[^0-9]/ig,"");
        }
        return str;
    }
}
const ThousandInput = FormatContainer(Input,formatThousandthNumber);
export {InputContainer,NumericInput,InterInput,PosInterInput,LetterInput,ThousandInput};
