import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../src/_index';
import {Input, InterInput,LetterInput,ThousandInput,NumericInput } from '../src/index';

var appElement = document.getElementById('example');
class App1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { v: { v: '2,133.123' } };
    this.clickHandle = this.clickHandle.bind(this);
  }
  changeHandle(value){
    console.log(value)
  }
  clickHandle(e){
    this.setState({v:11.12355})
  }
  getValueHandle=()=>{
    alert(ReactDOM.findDOMNode(this.txt).value)
  }
  render() {
    return (
      <div>
        <button onClick={this.clickHandle} >test</button>
        <button onClick={this.getValueHandle}>getvalue</button>
        {/* <Input value={this.state.v} ref={txt=>this.txt=txt}/>
        <Input multiple={true} value={this.state.v} ref={txt=>this.txt=txt}/>
        <InterInput className="txb" placeholder="请输入数字" value={this.state.v} />
        <LetterInput placeholder="请输入字母"  value={this.state.v}  onChange={this.changeHandle.bind(this)}/> */}
        <ThousandInput placeholder="千分位数字" value={this.state.v}  decimals="4" onChange={this.changeHandle.bind(this)}/>
        {/* <NumericInput value="2.12" decimals="2" onChange={this.changeHandle.bind(this)}/> */}
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