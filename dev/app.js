import React from 'react';
import ReactDOM from 'react-dom';
import '../src/_index';
import {Input, InterInput,LetterInput,ThousandInput,NumericInput } from '../src/index';

var appElement = document.getElementById('example');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { v: '213' };
    this.clickHandle = this.clickHandle.bind(this);
  }
  changeHandle(value){
    console.log(value)
  }
  clickHandle(e){
    this.setState({v:11})
  }
  render() {
    return (
      <div>
        <button onClick={this.clickHandle}>test</button>
        <Input value={this.state.v}/>
        <InterInput className="txb" placeholder="请输入数字" value={this.state.v} onChange={this.changeHandle.bind(this)}/>
        <LetterInput placeholder="请输入字母"  value="" onChange={this.changeHandle.bind(this)}/>
        <ThousandInput placeholder="千分位数字" value="" decimals="4" onChange={this.changeHandle.bind(this)}/>
        <NumericInput value="2.12" decimals="2" value="123" onChange={this.changeHandle.bind(this)}/>
      </div>
    )
  }
}
ReactDOM.render(<App />, appElement);