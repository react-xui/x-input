/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2020-04-16 19:05:29
 * @LastEditTime: 2020-04-17 16:30:20
 * @github: https://github.com/tianxiangbing
 */
import { shallow } from 'enzyme';
import React from 'react';
import { NumberInput } from '../index';
import  sinon from 'sinon';
const setup = (props={})=>{
    return {
        input:shallow(<NumberInput {...props}/>),
        props}
}

describe('初始化测试',()=>{
    it('init',()=>{
        const {input} = setup({
            value:"1234"
        });
        let displayName = NumberInput.displayName;
        expect(displayName).toBe('NumberInput');
        expect(input.find('input').prop('value')).toEqual('1234')
    })
    it("传props值改变同步value",()=>{
        const {input} = setup({
            onChange:(v)=>{
                console.log(v)
            }
        });
        let spy = sinon.spy(NumberInput.prototype,'componentWillReceiveProps')
        input.setProps({'value':'12345'});
        // expect(spy.calledOnce)
        expect(input.find('input').prop('value')).toEqual('12345');
        // input.setProps({'value':'abcde'});
        // expect(spy.calledOnce)
        // expect(input.find('input').prop('value')).toEqual('abcde');
        // input.find('input').simulate('change',{target:{value:'qqqq'}});
        // // let spy2 = sinon.spy( input.find('input').prototype,'onChange');
        // expect(spy.calledOnce)
        // // expect(spy2).toBeCalled();
        // // expect(spy2).toBeCalledWith('qqqq');
        // expect(input.find('input').prop('value')).toEqual('qqqq')
        // expect(NumberInput.prototype.componentWillReceiveProps.callCount).toBe(3)
    })
})