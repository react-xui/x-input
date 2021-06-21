<!--
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2018-11-27 18:08:06
 * @LastEditTime: 2021-06-21 09:18:43
 * @github: https://github.com/tianxiangbing
 -->
# x-input
react.js文本输入框，限制输入内容为数字、字母、千分位等,支持输入K、M快捷键.
***
## npm安装

```bash
npm install jsx-input --save
```
基本使用方式
```js
import { Input,NumberInput } from 'jsx-input';
  <NumberInput id="txb2" className="test2" spinner={true} step={1}  onChange={v=>{console.log('change22:',v);}}  maxLength={17} decimals={2} isFormat={true}  returnType={this.state.returnType} value={this.state.numberValue} showTitle={true}/>
  <NumberInput id="txb2" className="test2" overFloat={true} spinner={true} step={0.0001} delay={1000} onStep={(v,obj)=>{console.log('step::',v,obj)}} onChange={v=>{console.log('change22:',v);}}  maxLength={17} decimals={4} isFormat={true}  returnType={this.state.returnType} value={this.state.numberValue} showTitle={true}/>
  <Input type="text" className="text"/>
  <Input type="textarea" className="texxt"/>    
    
```
效果图如下

![x-input](examples/input.gif)
# Input 
输入框
## type
  `text`或`textarea`
## onChange
  参数为值内容
# NumberInput
## delay
  优化onChange频繁调用的缓冲时间，毫秒数
## returnType 
返回值类型,支持Number,String等
## spinner [bool]
是否打开微调器
## step
微调器步数
## onStep(value,{offset:step,'up'||'down})
微调点击回调
## max
最大值,默认MAX_SAFE_NUMBER
## min
最小值,默认MIN_SAFE_NUMBER
## stepDecimals  [Number]
精度步数，如果是设置4，则每次调整步数为0.0001
## addonBefore
前置标签
## addonAfter
后置标签
### 关于作者
[https://github.com/tianxiangbing](https://github.com/tianxiangbing)

# NumberInput
主要针对数字型输入的组件优化。
```
onChange: PropTypes.func,
value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]),
returnType: PropTypes.string,
decimals: PropTypes.number,
isFormat: PropTypes.bool,//是否格式化
negative: PropTypes.bool,//是否支持负数
maxLength: PropTypes.number,//长度限制，只作整数部分的长度
delay: PropTypes.number,//事件延迟时间毫秒
```
### xui
react xui组件一直在持续更新中，欢迎大家关注[https://github.com/react-xui](https://github.com/react-xui)