import React from 'react';
import ReactDOM from 'react-dom';
import '../src/_index';
import {Input, InterInput,LetterInput,ThousandInput,NumericInput } from '../src/index';

var appElement = document.getElementById('example');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { v: '213.123' };
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
        <Input value={this.state.v} ref={txt=>this.txt=txt}/>
        <InterInput className="txb" placeholder="请输入数字" value={this.state.v} />
        <LetterInput placeholder="请输入字母"  value={this.state.v}  onChange={this.changeHandle.bind(this)}/>
        <ThousandInput placeholder="千分位数字" value={this.state.v}  decimals="4" onChange={this.changeHandle.bind(this)}/>
        <NumericInput value="2.12" decimals="2" onChange={this.changeHandle.bind(this)}/>
      </div>
    )
  }
}
ReactDOM.render(<App />, appElement);