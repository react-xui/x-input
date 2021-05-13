/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2018-11-27 18:08:06
 * @LastEditTime: 2021-05-13 15:41:16
 * @github: https://github.com/tianxiangbing
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../src/_index';
import {Input, InterInput,LetterInput,ThousandInput,NumericInput ,NumberInput} from '../src/index';

var appElement = document.getElementById('example');
class App1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { v:0 ,decimals:3,visible:true,numberValue:'0',returnType:'Number'};
    this.clickHandle = this.clickHandle.bind(this);
  }
  changeHandle(value){
    console.error(value)
    this.setState({v:value})
  }
  clickHandle(e){
    this.setState({v:0})
  }
  getValueHandle=()=>{
    alert(this.state.v)
  }
  changeDecimals=()=>{
    this.setState({decimals:4,value:0})
  }
  changeDecimals2=()=>{
    this.setState({decimals:2})
  }
  changeDecimals0=()=>{
    this.setState({decimals:0})
  }
  toggleVisible=()=>{
    this.setState({visible:!this.state.visible})
  }
  componentDidMount(){
    this.setState({decimals:4})
  }
  setProps(){
    this.setState({returnType:'Number',numberValue:Math.random()*1000})
  }
  render() {
    return (
      <div>
      {/* <button onClick={this.changeDecimals}>4位小数</button>
      <button onClick={this.changeDecimals2}>2位小数</button>
      <button onClick={this.changeDecimals0}>0位小数</button>
        <button onClick={this.clickHandle} >test</button>
        <button onClick={this.getValueHandle}>getvalue</button>
        <button onClick={this.toggleVisible}>toggleVisible</button>
        <LetterInput placeholder="请输入字母"  value={this.state.v}  onChange={this.changeHandle.bind(this)}/>
        <Input value={this.state.v} ref={txt=>this.txt=txt}/> */}
        {/* <Input multiple={true} value={this.state.v} ref={txt=>this.txt=txt}/>
        <Input.Inter className="txb" placeholder="请输入数字" value={this.state.v} />
        <InterInput className="txb" negative={false} placeholder="请输入正数" value={this.state.v} /> */}
        {/* <NumberInput disabled={true} id="txb" min={3} max={20} negative={false}   spinner={true} delay={1000} onChange={v=>{console.log('change11:',v);this.setState({numberValue:v})}}  maxLength={17} isFormat={true}  returnType={this.state.returnType} value={this.state.numberValue} showTitle={true}/> */}
        <NumberInput id="txb2" className="test2" spinner={true} step={1}  onChange={v=>{console.log('change22:',v);}}  maxLength={17} decimals={2} isFormat={true}  returnType={this.state.returnType} value={this.state.numberValue} showTitle={true}/>
        <NumberInput id="txb2" className="test2" overFloat={true} spinner={true} step={0.0001} delay={1000} onStep={(v,obj)=>{console.log('step::',v,obj)}} onChange={v=>{console.log('change22:',v);}}  maxLength={17} decimals={4} isFormat={true}  returnType={this.state.returnType} value={this.state.numberValue} showTitle={true}/>
        {/* <NumberInput className="test2" delay={1000} onChange={v=>{console.log('change33:',v);this.setState({numberValue:v})}}  negative={true} maxLength={17} decimals={this.state.decimals} isFormat={true}  returnType={this.state.returnType} value={this.state.numberValue} showTitle={true}/> */}
        {/* <NumberInput disabled={this.state.visible} onChange={v=>console.log(v)} delay={1000} maxLength={9} isFormat={true}  negative={true}/> */}
        <button onClick={this.setProps.bind(this)}>setProps</button>
       {/* {this.state.visible ? <ThousandInput placeholder="负千分位数字" negative={true}  value={this.state.v}  decimals={this.state.decimals} onChange={this.changeHandle.bind(this)}/>:null} */}
        {/* <NumericInput placeholder="负千分位数字" negative={true}  value={this.state.v}  decimals={this.state.decimals} onChange={this.changeHandle.bind(this)}/> */}
       {/* <ThousandInput placeholder="千分位数字" returnType="String" negative={false}  value={this.state.v}  decimals={4} onChange={this.changeHandle.bind(this)}/> */}
        {/* <NumericInput  placeholder="两位小数" onChange={v=>console.error(v)} negative={true} decimals={this.state.decimals}/> */}
        <Input type="text" className="text"/>
        <Input type="textarea" className="texxt"/>
      </div>
    )
  }
}
class Test extends Component{
  constructor(props){
    super(props);
    console.log('Test constructor')
  }
  componentWillMount(){
    console.log('Test willmount');
  }
  componentDidMount(){
    console.log('Test didmount,')
  }
  
  shouldComponentUpdate(){
    console.log('Test should')
    return true;
  }
  componentWillReceiveProps(){
    console.log('Test receive')
  }
  componentWillUpdate(){
    console.log('Test willupdate')
  }
  componentDidUpdate(){
    console.log('Test didupdate')
  }
  hello(){
    console.log('hello')
  }
  render(){
    console.log('Test render');
    return <div>sdf</div>
  }
}
class App extends Component{
  constructor(props){
    super(props);
    this.state={time:+new Date()}
    console.log('app constructor')
  }
  componentWillMount(){
    console.log('app willmount');
  }
  componentDidMount(){
    console.log('app didmount,')
  }
  onClick(){
    this.setState({time:+new Date()})
  }
  shouldComponentUpdate(){
    console.log('app should')
    return true;
  }
  componentWillReceiveProps(){
    console.log('app receive')
  }
  componentWillUpdate(){
    console.log('app willupdate')
  }
  componentDidUpdate(){
    console.log('app didupdate')
  }
  proc(ref) {
    ref.hello()
  }
  render(){
    console.log('app render');
    return  <div><Test2 time={this.state.time} ref={this.proc.bind(this)}/> <button onClick={this.onClick.bind(this)}>click</button></div>
  }
}
const Test2 = refsHOC(Test)
function refsHOC(WrappedComponent) {
  return class RefsHOC extends React.Component {
    proc(wrappedComponentInstance) {
      wrappedComponentInstance.hello()
    }
    hello(){
      console.log('hoc hello')
    }
    render() {
      const props = Object.assign({}, this.props, {ref: this.proc.bind(this)})
      return <WrappedComponent {...props}/>
    }
  }
}

ReactDOM.render(<App1 />, appElement);