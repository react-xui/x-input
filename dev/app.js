import React from 'react';
import ReactDOM from 'react-dom';
import '../src/_index';
import { InterInput,LetterInput,ThousandInput } from '../src/index';

var appElement = document.getElementById('example');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }
  testFunc() {
    this.setState({ show: !this.state.show });
  }
  render() {
    return (
      <div>
        <InterInput placeholder="请输入数字"/>
        <LetterInput placeholder="请输入字母"/>
        <ThousandInput placeholder="千分位数字"/>
      </div>
    )
  }
}
ReactDOM.render(<App />, appElement);