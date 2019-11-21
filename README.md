<!--
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2018-11-27 18:08:06
 * @LastEditTime: 2019-11-21 18:18:48
 * @github: https://github.com/tianxiangbing
 -->
# x-input
react.js文本输入框，限制输入内容为数字、字母、千分位等
***
## npm安装

```bash
npm install jsx-input --save
```
基本使用方式
```js
import { Input,NumericInput,InterInput,PosInterInput,LetterInput,ThousandInput } from 'jsx-input';
      <LetterInput placeholder="请输入字母"  value={this.state.v}  onChange={this.changeHandle.bind(this)}/>
        <Input value={this.state.v} ref={txt=>this.txt=txt}/>
        <Input multiple={true} value={this.state.v} ref={txt=>this.txt=txt}/>
        <InterInput className="txb" placeholder="请输入数字" value={this.state.v} />
        <InterInput className="txb" negative={false} placeholder="请输入正数" value={this.state.v} />
        <ThousandInput placeholder="负千分位数字" negative={true}  value={this.state.v}  decimals="4" onChange={this.changeHandle.bind(this)}/>
        <ThousandInput placeholder="千分位数字" negative={false}  value={this.state.v}  decimals="4" onChange={this.changeHandle.bind(this)}/>
        <NumericInput value="2.12" negative={true} decimals="2" onChange={this.changeHandle.bind(this)}/>
    
```
效果图如下

![x-input](examples/input.gif)
## Input 
输入框
## negative:[bool]
是否支持负数
## multiple:[bool]
是否为多行textarea输入框
## NumericInput
纯数字输入框，只能输入正负整数或小数，属性`decimals`限制小数位数
## LetterInput
纯字母输入框
## ThousandInput
带千分位的数字输入框，属性`decimals`限制小数位数
## PosInterInput
正整数输入限制
## InputContainer (Input,regular)
高阶组件，可以对input进行格式定制，第二个参数为格式化的正则表达式，如上面的数字输入框 `InputContainer(Input,/^-?(0|[1-9][0-9]*)$/);`
## returnType 
返回值类型,支持Number,String等
### 关于作者
[https://github.com/tianxiangbing](https://github.com/tianxiangbing)

### xui
react xui组件一直在持续更新中，欢迎大家关注[https://github.com/react-xui](https://github.com/react-xui)