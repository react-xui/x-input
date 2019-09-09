import { shallow } from 'enzyme';
import React from 'react';
import { Input } from '../components/Input';
import  sinon from 'sinon';
const setup = ({ ...props }) => {
    const wrapper = shallow(<Input {...props} />);
    return {
        props,
        wrapper,
    };
};

class App extends React.Component{
    state={value:233}
    render(){
        return <div>
            <Input value={this.state.value}></Input>
        </div>
    }
}

describe('Test Input', () => {
    it('测试初始化赋值', () => {
        const { wrapper } = setup({ value: "123" });
        expect(wrapper.get(0).props.value).toEqual('123');
        expect(wrapper.state('value')).toEqual('123');
    });
    it('测试修改props的value时state是否同步',()=>{
        const { wrapper } = setup({ value: "123" });
        let spy = sinon.spy(Input.prototype,'componentWillReceiveProps');
        expect(spy).toHaveProperty('callCount',0)
        wrapper.setProps({ 'value': '456' });
        expect(wrapper.state('value')).toEqual('456');
        expect(spy).toHaveProperty('callCount',1)
    });
    it('测试父组件更新后,input的props更新同步',()=>{
        const parentNode = shallow(<App/>);
        parentNode.setState({value:555});
        console.log(parentNode.find('input'))
        expect(parentNode.find('div').children().prop('value')).toEqual('555');

    })
});