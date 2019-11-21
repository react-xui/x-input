/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2018-11-27 18:08:06
 * @LastEditTime: 2019-11-21 16:17:22
 * @github: https://github.com/tianxiangbing
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../src/_index';
import {Input, InterInput,LetterInput,ThousandInput,NumericInput } from '../src/index';

var appElement = document.getElementById('example');
class App1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { v: { v: '2,133.123' } ,decimals:2};
    this.clickHandle = this.clickHandle.bind(this);
  }
  changeHandle(value){
    console.log(value)
  }
  clickHandle(e){
    this.setState({v:11123457.12355})
  }
  getValueHandle=()=>{
    alert(ReactDOM.findDOMNode(this.txt).value)
  }
  changeDecimals=()=>{
    this.setState({decimals:3})
  }
  render() {
    return (
      <div>
        <button onClick={this.clickHandle} >test</button>
        <button onClick={this.getValueHandle}>getvalue</button>
        <button onClick={this.changeDecimals}>三位小数</button>
        <LetterInput placeholder="请输入字母"  value={this.state.v}  onChange={this.changeHandle.bind(this)}/>
        <Input value={this.state.v} ref={txt=>this.txt=txt}/>
        <Input multiple={true} value={this.state.v} ref={txt=>this.txt=txt}/>
        <Input.Inter className="txb" placeholder="请输入数字" value={this.state.v} />
        <InterInput className="txb" negative={false} placeholder="请输入正数" value={this.state.v} />
        <ThousandInput placeholder="负千分位数字" negative={true}  value={this.state.v}  decimals="4" onChange={this.changeHandle.bind(this)}/>
        <ThousandInput placeholder="千分位数字" negative={false}  value={this.state.v}  decimals="4" onChange={this.changeHandle.bind(this)}/>
        <NumericInput  placeholder="两位小数" value="2.123" negative={true} decimals={this.state.decimals} onChange={this.changeHandle.bind(this)}/>
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