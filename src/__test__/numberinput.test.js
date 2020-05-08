/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2020-04-16 19:05:29
 * @LastEditTime: 2020-05-08 11:31:02
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
    let spy = sinon.spy(NumberInput.prototype,'componentWillReceiveProps')//监听生命周期
    it('init',()=>{
        let {input} = setup({
            value:"1234"
        });
        let displayName = NumberInput.displayName;
        expect(displayName).toBe('NumberInput');
        expect(input.find('input').prop('value')).toEqual('1234')
    })
    it("传props值改变同步value",()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            onChange:callback,
            returnType:'Number'
        });
        input.setProps({'value':'12345'});
        expect(input.find('input').prop('value')).toEqual('12345');
        expect(callback.calledOnce).toBe(true)
        // console.log(callback.args[0])
        // console.log(callback.returned(12345))
        expect(spy.callCount).toEqual(1);//一次进willRecive
        expect(callback.returned(12345)).toBe(true);//回调返回值判断
      
    })
    it('事件模拟change,传入字符串',()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            onChange:callback
        });
        input.find('input').simulate('change',{target:{value:'9999'}});//事件模拟
        // let spy2 = sinon.spy( input.find('input').prototype,'onChange');
        expect(spy.callCount).toEqual(1);//一次进willRecive
        expect(callback.calledOnce).toBe(true)//被调用
        expect(callback.returned(9999)).toBe(true);
        expect(input.find('input').prop('value')).toEqual("9999")
        expect(spy.callCount).toBe(1);
       
    })
    it('传入数字类型的vlaue',()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            onChange:callback
        });
        input.setProps({value:986.01});
        expect(input.find('input').prop('value')).toEqual('986.01');
        expect(callback.callCount).toBe(1)
        expect(spy.callCount).toBe(2)//第二次进recive
        expect(callback.returned(986.01)).toEqual(true)
    })
    it('returnType判断',()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            onChange:callback,
            returnType:'String'
        });
        input.setProps({'value':'abcde'});
        console.log(spy.callCount)
        expect(spy.callCount).toBe(3)//第三次进recive
        expect(input.find('input').prop('value')).toBe('');
        expect(callback.callCount).toBe(0);//回调返回值判断
    })
    it('初始化数字格式化千分位',()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            value:12345,
            isFormat:true,
            onChange:callback
        });
        expect(input.find('input').prop('value')).toEqual('12,345');
        input.setProps({value:5556789});
        expect(input.find('input').prop('value')).toEqual('5,556,789');
        expect(spy.callCount).toEqual(4);
        expect(callback.returned(5556789)).toBe(true);
        input.find('input').simulate('change',{target:{value:"88877"}});
        expect(spy.callCount).toEqual(4);
        expect(input.find('input').prop('value')).toEqual('88,877');
        expect(callback.returned(88877)).toBe(true);
    });
    it('测试多次setProps同一个值，与change比较',()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            isFormat:true,
            onChange:callback
        });
        input.setProps({value:"4321"});//字符串
        expect(input.find('input').prop('value')).toEqual('4,321');
        expect(spy.callCount).toEqual(5);
        expect(callback.returned(4321)).toBe(true);
        input.setProps({value:4321});//number类型
        expect(input.find('input').prop('value')).toEqual('4,321');
        expect(spy.callCount).toEqual(6);
        expect(callback.returned(4321)).toBe(true);
        //通过change改变value
        input.find('input').simulate('change',{target:{value:'6667'}});
        expect(input.find('input').prop('value')).toEqual('6,667');
        expect(spy.callCount).toEqual(6);
        expect(callback.returned(6667)).toBe(true);
        //再次set回原来的值.
        input.setProps({value:4321});//number类型
        //这里由于props没有改变，不触发更新
        expect(input.find('input').prop('value')).toEqual('6,667');
        expect(spy.callCount).toEqual(7);
        expect(callback.returned(6667)).toBe(true);
    });
    it('小数位相关测试',()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            isFormat:true,
            onChange:callback,
            decimals:4,
            value:55555
        });
        expect(input.find('input').prop('value')).toBe('55,555.0000');
        input.setProps({value:5555.55});
        expect(input.find('input').prop('value')).toEqual('5,555.5500');
        expect(spy.callCount).toEqual(8);
        input.simulate('change',{target:{value:3232}});
        expect(input.find('input').prop('value')).toBe('3,232');
        input.simulate('blur');
        expect(input.find('input').prop('value')).toBe('3,232.0000');
        expect(callback.returned(3232.0000));
    });
    
    it('不设置decimals时或非数字decimals处理',()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            isFormat:true,
            onChange:callback
        });
        input.simulate('change',{target:{value:'1213.123'}})
        expect(input.find('input').prop('value')).toBe('1,213');
        expect(callback.returned(1213)).toBeTruthy();
        input.setProps({value:111.222,decimals:'aaa'});
        expect(input.find('input').prop('value')).toBe('111')
    })
    it('科学计数返回字符串',()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            isFormat:true,
            onChange:callback,
            decimals:0,
            value:'111111111111111111'
        });
        expect(input.find('input').prop('value')).toEqual('111,111,111,111,111,111');
        input.find('input').simulate('change',{target:{value:'1,111,111,111,111,111,122'}});
        expect(callback.returned('1111111111111111122')).toBe(true);
        expect(input.find('input').prop('value')).toEqual('1,111,111,111,111,111,122');
        input.setProps({value:'1111111111111111225555'});
        expect(input.find('input').prop('value')).toEqual('1,111,111,111,111,111,225,555');
        expect(callback.returned('1111111111111111225555')).toBe(true);
    });
    it("正负数参数判断",()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            isFormat:true,
            onChange:callback,
            decimals:0,
            negative:false,//正数
        });
        input.simulate('change',{target:{value:"-"}});
        expect(input.find('input').prop('value')).toBe('');
        input.setProps({value:1});
        input.simulate('change',{target:{value:"-1"}});
        expect(input.find('input').prop('value')).toBe('1');
        input.setProps({negative:true,value:-1234});
        expect(input.find('input').prop('value')).toBe("-1,234")
        expect(callback.returned(-1234)).toBeTruthy();
    });
    it('负数内容测试',()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            isFormat:true,
            onChange:callback,
            decimals:0,
            negative:true,//支持负数
        });
        input.simulate('change',{target:{value:"-"}});
        expect(input.find('input').prop('value')).toBe('-');
        expect(input.state('value')).toBe('-');
        expect(callback.calledOnce).toBeFalsy();
        input.simulate('change',{target:{value:"-1"}});
        expect(callback.returned(-1)).toBeTruthy();
        input.simulate('change',{target:{value:"-"}});
        expect(callback.returned('')).toBeTruthy();
    })
    it('非法输入内容测试',()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            isFormat:true,
            onChange:callback,
            decimals:0,
            negative:false,//正数
        });
        input.simulate('change',{target:{value:'a'}});
        expect(input.find('input').prop('value')).toBe('');
        input.setProps({value:12});
        input.simulate('change',{target:{value:'1a2'}});
        expect(input.find('input').prop('value')).toBe('12');
        expect(callback.returned(12)).toBeTruthy();
        input.setProps({value:'1b2'});
        expect(input.find('input').prop('value')).toBe('12');
        expect(callback.returned(12)).toBeTruthy();
    });
    it('长度的限制',()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            isFormat:true,
            onChange:callback,
            decimals:2,
            negative:true,//正数
            maxLength:4
        });
        input.setProps({value:1234})
        input.simulate('change',{target:{value:'123556'}});
        expect(input.state('value')).toBe("1234.00");
        expect(input.find('input').prop('value')).toBe('1,234.00');
        input.simulate('change',{target:{value:'-1234'}});
        expect(input.find('input').prop('value')).toBe('-1,234');
        input.simulate('change',{target:{value:'-13,234'}});
        expect(input.find('input').prop('value')).toBe('-1,234');
        input.simulate('blur');
        expect(input.find('input').prop('value')).toBe('-1,234.00');
        input.setProps({value:-12534});
        expect(input.find('input').prop('value')).toBe('-1,234.00');
    });
    it('delay优化onchange时机',(done)=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            isFormat:true,
            onChange:callback,
            decimals:2,
            delay:1000,
        });
        input.simulate('change',{target:{value:'1'}})
        expect(callback.calledOnce).toBeFalsy();
        input.simulate('change',{target:{value:'12'}})
        expect(callback.calledOnce).toBeFalsy();
        setTimeout(()=>{
            expect(callback.calledOnce).toBeTruthy();
            expect(callback.returned(12)).toBe(true);
            done()
        },1000);
    });
    it('设置disabled属性',()=>{
        let onChange = (v)=>{
            console.log(v)
            return v;
        }
        let callback = sinon.spy(onChange);//监听callback
        let {input} = setup({
            isFormat:true,
            onChange:callback,
            decimals:2,
            value:1234,
        });
        input.setProps({disabled:true});
        input.simulate('change',{target:{value:'12345'}});
        expect(input.find('input').prop('value')).toBe('1,234.00');
        input.setProps({disabled:false});
        input.simulate('change',{target:{value:'12345'}})
        expect(input.find('input').prop('value')).toBe('12,345');
        expect(callback.returned(12345)).toBeTruthy();
    })
})