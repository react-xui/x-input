'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../index');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2020-04-16 19:05:29
 * @LastEditTime: 2020-12-31 09:06:53
 * @github: https://github.com/tianxiangbing
 */
var setup = function setup() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return {
        input: (0, _enzyme.mount)(_react2.default.createElement(_index.NumberInput, props)),
        props: props };
};

describe('初始化测试', function () {
    var spy = _sinon2.default.spy(_index.NumberInput.prototype, 'componentWillReceiveProps'); //监听生命周期
    it('init', function () {
        var _setup = setup({
            value: "1234"
        }),
            input = _setup.input;

        var displayName = _index.NumberInput.displayName;
        expect(displayName).toBe('NumberInput');
        expect(input.find('input').prop('value')).toEqual('1,234');
    });
    it("传props值改变同步value", function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup2 = setup({
            onChange: callback,
            returnType: 'Number'
        }),
            input = _setup2.input;

        input.setProps({ 'value': '12345' });
        expect(input.find('input').prop('value')).toEqual('12,345');
        expect(callback.calledOnce).toBe(true);
        // console.log(callback.args[0])
        // console.log(callback.returned(12345))
        expect(spy.callCount).toEqual(1); //一次进willRecive
        expect(callback.returned(12345)).toBe(true); //回调返回值判断
    });
    it('事件模拟change,传入字符串', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup3 = setup({
            onChange: callback
        }),
            input = _setup3.input;

        input.find('input').simulate('change', { target: { value: '9999' } }); //事件模拟
        // let spy2 = sinon.spy( input.find('input').prototype,'onChange');
        expect(spy.callCount).toEqual(1); //一次进willRecive
        expect(callback.calledOnce).toBe(true); //被调用
        expect(callback.returned(9999)).toBe(true);
        expect(input.find('input').prop('value')).toEqual("9,999");
        expect(spy.callCount).toBe(1);
    });
    it('传入数字类型的vlaue', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup4 = setup({
            onChange: callback,
            decimals: 2
        }),
            input = _setup4.input;

        input.setProps({ value: 986.01 });
        expect(input.find('input').prop('value')).toEqual('986.01');
        expect(callback.callCount).toBe(1);
        expect(spy.callCount).toBe(2); //第二次进recive
        expect(callback.returned(986.01)).toEqual(true);
    });
    it('returnType判断', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup5 = setup({
            onChange: callback,
            returnType: 'String'
        }),
            input = _setup5.input;

        input.setProps({ 'value': 'abcde' });
        console.log(spy.callCount);
        expect(spy.callCount).toBe(3); //第三次进recive
        expect(input.find('input').prop('value')).toBe('');
        expect(callback.callCount).toBe(0); //回调返回值判断
    });
    it('初始化数字格式化千分位', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup6 = setup({
            value: 12345,
            isFormat: true,
            onChange: callback
        }),
            input = _setup6.input;

        expect(input.find('input').prop('value')).toEqual('12,345');
        input.setProps({ value: 5556789 });
        expect(input.find('input').prop('value')).toEqual('5,556,789');
        expect(spy.callCount).toEqual(4);
        expect(callback.returned(5556789)).toBe(true);
        input.find('input').simulate('change', { target: { value: "88877" } });
        expect(spy.callCount).toEqual(4);
        expect(input.find('input').prop('value')).toEqual('88,877');
        expect(callback.returned(88877)).toBe(true);
    });
    it('测试多次setProps同一个值，与change比较', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup7 = setup({
            isFormat: true,
            onChange: callback
        }),
            input = _setup7.input;

        input.setProps({ value: "4321" }); //字符串
        expect(input.find('input').prop('value')).toEqual('4,321');
        expect(spy.callCount).toEqual(5);
        expect(callback.returned(4321)).toBe(true);
        input.setProps({ value: 4321 }); //number类型
        expect(input.find('input').prop('value')).toEqual('4,321');
        expect(spy.callCount).toEqual(6);
        expect(callback.returned(4321)).toBe(true);
        //通过change改变value
        input.find('input').simulate('change', { target: { value: '6667' } });
        expect(input.find('input').prop('value')).toEqual('6,667');
        expect(spy.callCount).toEqual(6);
        expect(callback.returned(6667)).toBe(true);
        //再次set回原来的值.
        input.setProps({ value: 4321 }); //number类型
        //这里由于props没有改变，不触发更新
        expect(input.find('input').prop('value')).toEqual('6,667');
        expect(spy.callCount).toEqual(7);
        expect(callback.returned(6667)).toBe(true);
    });
    it('小数位相关测试', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup8 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 4,
            value: 55555
        }),
            input = _setup8.input;

        expect(input.find('input').prop('value')).toBe('55,555.0000');
        input.setProps({ value: 5555.55 });
        expect(input.find('input').prop('value')).toEqual('5,555.5500');
        expect(spy.callCount).toEqual(8);
        input.simulate('change', { target: { value: 3232 } });
        expect(input.find('input').prop('value')).toBe('3,232');
        input.simulate('blur');
        expect(input.find('input').prop('value')).toBe('3,232.0000');
        expect(callback.returned(3232.0000));
    });

    it('不设置decimals时或非数字decimals处理', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup9 = setup({
            isFormat: true,
            onChange: callback
        }),
            input = _setup9.input;

        input.simulate('change', { target: { value: '1213.123' } });
        expect(input.find('input').prop('value')).toBe('1,213');
        expect(callback.returned(1213)).toBeTruthy();
        input.simulate('blur');
        input.setProps({ value: 111.222, decimals: 'aaa' });
        expect(input.find('input').prop('value')).toBe('111');
        input.setProps({ value: 12, decimals: '2' });
        input.simulate('change', { target: { value: '22' } });
        input.simulate('blur');
        expect(input.find('input').prop('value')).toBe('22.00');
        //动态更改小数位测试
        input.setProps({ decimals: 4, value: '22.00' });
        expect(input.find('input').prop('value')).toBe('22.0000');
    });

    it('科学计数返回字符串', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup10 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 0,
            value: '111111111111111111'
        }),
            input = _setup10.input;

        expect(input.find('input').prop('value')).toEqual('111,111,111,111,111,111');
        input.find('input').simulate('change', { target: { value: '1,111,111,111,111,111,122' } });
        expect(callback.returned('1111111111111111122')).toBe(true);
        expect(input.find('input').prop('value')).toEqual('1,111,111,111,111,111,122');
        input.simulate('blur');
        input.setProps({ value: '1111111111111111225555' });
        expect(input.find('input').prop('value')).toEqual("9,007,199,254,740,991");
        expect(callback.returned(Number.MAX_SAFE_INTEGER)).toBe(true);
    });
    it("正负数参数判断", function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup11 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 0,
            negative: false //正数
        }),
            input = _setup11.input;

        input.simulate('change', { target: { value: "-" } });
        expect(input.find('input').prop('value')).toBe('');
        input.simulate('blur');
        input.setProps({ value: 1 });
        input.simulate('change', { target: { value: "-1" } });
        expect(input.find('input').prop('value')).toBe('1');
        input.simulate('blur');
        input.setProps({ negative: true, value: -1234 });
        expect(input.find('input').prop('value')).toBe("-1,234");
        expect(callback.returned(-1234)).toBeTruthy();
    });
    it('负数内容测试', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup12 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 0,
            negative: true //支持负数
        }),
            input = _setup12.input;

        input.simulate('change', { target: { value: "-" } });
        expect(input.find('input').prop('value')).toBe('-');
        expect(input.state('value')).toBe('-');
        expect(callback.calledOnce).toBeFalsy();
        input.simulate('change', { target: { value: "-1" } });
        expect(callback.returned(-1)).toBeTruthy();
        input.simulate('change', { target: { value: "-" } });
        expect(callback.returned('')).toBeTruthy();
    });
    it('非法输入内容测试', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup13 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 0,
            negative: false //正数
        }),
            input = _setup13.input;

        input.simulate('change', { target: { value: 'a' } });
        expect(input.find('input').prop('value')).toBe('');
        input.simulate('blur');
        input.setProps({ value: 12 });
        input.simulate('change', { target: { value: '1a2' } });
        expect(input.find('input').prop('value')).toBe('12');
        expect(callback.returned(12)).toBeTruthy();
        input.simulate('blur');
        input.setProps({ value: '1b2' });
        expect(input.find('input').prop('value')).toBe('12');
        expect(callback.returned(12)).toBeTruthy();
    });
    it('长度的限制', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup14 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 2,
            negative: true, //正数
            maxLength: 4
        }),
            input = _setup14.input;

        input.setProps({ value: 1234 });
        input.simulate('change', { target: { value: '123556' } });
        expect(input.state('value')).toBe("1234.00");
        expect(input.find('input').prop('value')).toBe('1,234.00');
        input.simulate('change', { target: { value: '-1234' } });
        expect(input.find('input').prop('value')).toBe('-1,234');
        input.simulate('change', { target: { value: '-13,234' } });
        expect(input.find('input').prop('value')).toBe('-1,234');
        input.simulate('blur');
        expect(input.find('input').prop('value')).toBe('-1,234.00');
        input.setProps({ value: -12534 });
        expect(input.find('input').prop('value')).toBe('-1,234.00');
    });
    it('delay优化onchange时机', function (done) {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup15 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 2,
            delay: 1000
        }),
            input = _setup15.input;

        input.simulate('change', { target: { value: '1' } });
        expect(callback.calledOnce).toBeFalsy();
        input.simulate('change', { target: { value: '12' } });
        expect(callback.calledOnce).toBeFalsy();
        setTimeout(function () {
            expect(callback.calledOnce).toBeTruthy();
            expect(callback.returned(12)).toBe(true);
            input.simulate('change', { target: { value: '1.' } });
            console.log('===========' + input.find('input').prop('value'));
            done();
        }, 1000);
    });
    it('设置disabled属性', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup16 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 2,
            value: 1234
        }),
            input = _setup16.input;

        input.setProps({ disabled: true });
        input.simulate('change', { target: { value: '12345' } });
        expect(input.find('input').prop('value')).toBe('1,234.00');
        input.setProps({ disabled: false });
        input.simulate('change', { target: { value: '12345' } });
        expect(input.find('input').prop('value')).toBe('12,345');
        expect(callback.returned(12345)).toBeTruthy();
    });
    it('设置readOnly属性', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup17 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 2,
            value: 1234
        }),
            input = _setup17.input;

        input.setProps({ readOnly: true });
        input.simulate('change', { target: { value: '12345' } });
        expect(input.find('input').prop('value')).toBe('1,234.00');
        input.setProps({ readOnly: false });
        input.simulate('change', { target: { value: '12345' } });
        expect(input.find('input').prop('value')).toBe('12,345');
        expect(callback.returned(12345)).toBeTruthy();
    });
    it('快捷输入K m ', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup18 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 2
        }),
            input = _setup18.input;

        input.setProps({ value: 2 });
        input.simulate('keyUp', { keyCode: 75 });
        expect(input.find('input').prop('value')).toBe("2,000");
        input.simulate('keyUp', { keyCode: 77 });
        expect(input.find('input').prop('value')).toBe("2,000,000,000");
        expect(callback.returned(2000000000)).toBeTruthy();
    });
    it('前面输入00', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup19 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 2
        }),
            input = _setup19.input;

        input.simulate('change', { target: { value: '001' } });
        expect(input.find('input').prop('value')).toBe("1");
        input.simulate('blur');
        expect(input.find('input').prop('value')).toBe("1.00");
    });
    it('-0的展示', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup20 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 2
        }),
            input = _setup20.input;

        input.simulate('change', { target: { value: '-0' } });
        expect(input.find('input').prop('value')).toBe("-0");
        input.simulate('blur');
        expect(input.find('input').prop('value')).toBe("0.00");
        input.simulate('change', { target: { value: '-01' } });
        expect(input.find('input').prop('value')).toBe("-1");
    });
    //TODO:测title，测传入classname
    it('测试传入showtitle属性显示title', function () {
        var _setup21 = setup({
            isFormat: true,
            decimals: 2,
            showTitle: true,
            className: 'cls-input'
        }),
            input = _setup21.input;

        input.simulate('change', { target: { value: '-0123' } });
        expect(input.find('input').prop('title')).toBe('-123');
        console.log(input.find('input').prop('className'));
        expect(input.find('input').prop('className')).toContain('cls-input');
    });
    it('blur时是否把最新值传给了外层', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup22 = setup({
            isFormat: true,
            decimals: 2,
            showTitle: true,
            className: 'cls-input',
            onChange: callback,
            delay: 1000
        }),
            input = _setup22.input;

        input.simulate('change', { target: { value: "1" } });
        input.simulate('blur');
        console.log(input.find('input').prop('value'));
        console.log('=========');
        expect(callback.returned(1)).toBeTruthy();
    });
    it('chage时不触发change，仅blur会触发change', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup23 = setup({
            isFormat: true,
            onChange: callback,
            decimals: 2,
            changeEvent: 'blur'
        }),
            input = _setup23.input;

        input.simulate('change', { target: { value: '1' } });
        expect(input.find('input').prop('value')).toBe("1");
        expect(callback.calledOnce).toBeFalsy();
        input.simulate('blur');
        expect(callback.calledOnce).toBeTruthy();
        expect(input.find('input').prop('value')).toBe("1.00");
        expect(callback.returned(1)).toBeTruthy();
    });
    it('在delay的情况下，焦点中输入数字到小数位点同步props.value', function (done) {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup24 = setup({
            onChange: callback,
            decimals: 2,
            delay: 100,
            value: 1,
            returnType: 'Number',
            isFormat: true
        }),
            input = _setup24.input;

        input.simulate('change', { target: { value: '2.' } });
        expect(input.find('input').prop('value')).toBe('2.');
        setTimeout(function () {
            expect(callback.returned(2)).toBeTruthy();
            expect(input.state('displayValue')).toBe('2.');
            input.setProps({ value: 2 });
            expect(input.find('input').prop('value')).toBe('2.');
            input.setProps({ value: '2', returnType: 'String' });
            expect(input.find('input').prop('value')).toBe('2');
            done();
        }, 101);
    });
    it('在delay的情况下，针对0的判断', function (done) {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup25 = setup({
            onChange: callback,
            decimals: 2,
            delay: 100,
            returnType: 'Number',
            value: 0
        }),
            input = _setup25.input;

        expect(input.find('input').prop('value')).toBe("0.00");
        //change value ''
        input.simulate('change', { target: { value: '' } });
        setTimeout(function () {
            console.log(input.find('input').prop('value'));
            console.log(input.state('value'));
            console.log(input.state('displayValue'));
            expect(callback.callCount).toBe(1);
            expect(callback.returned('')).toBeTruthy();
            expect(input.find('input').prop('value')).toBe('');
            //change value 0
            input.simulate('change', { target: { value: '0' } });
            setTimeout(function () {
                expect(callback.returned(0)).toBeTruthy();
                //清空，set props.value =0 
                input.simulate('change', { target: { value: '' } });
                setTimeout(function () {
                    expect(input.find('input').prop('value')).toBe('');
                }, 101);
                done();
            }, 101);
        }, 111);
    });
    it('初始化小数位格式化', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup26 = setup({
            onChange: callback,
            isFormat: true,
            decimals: 2,
            delay: 100,
            returnType: 'Number',
            value: 1.1
        }),
            input = _setup26.input;

        expect(input.find('input').prop('value')).toBe("1.10");
        expect(input.state('displayValue')).toBe("1.10");
        input.setProps({ value: 2.2 });
        expect(input.find('input').prop('value')).toBe("2.20");
        expect(input.state('displayValue')).toBe("2.20");
        expect(callback.calledOnce).toBeFalsy();
        input.setProps({ decimals: 3 });
        expect(input.state('displayValue')).toBe("2.200");
    });
    it('返回-验证', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };
        var callback = _sinon2.default.spy(onChange); //监听callback

        var _setup27 = setup({
            onChange: callback,
            isFormat: true,
            decimals: 2,
            delay: 100,
            returnType: 'Number',
            value: ""
        }),
            input = _setup27.input;

        input.simulate('change', {
            target: {
                value: '-'
            }
        });
        input.simulate('blur');
        expect(callback.callCount).toBe(1);
        expect(callback.returned('')).toBeTruthy();
        input.simulate('change', {
            target: {
                value: ''
            }
        });
        input.setProps({
            delay: 0,
            value: '-'
        });
        expect(callback.returned('')).toBeTruthy();
    });
    it('传入isAutoZero为false', function () {});
    it('输入正号的情况', function () {
        var _setup28 = setup({
            decimals: 2,
            delay: 100,
            returnType: 'Number',
            value: 123
        }),
            input = _setup28.input;

        input.setProps({ value: '+123' });
        expect(input.state('displayValue')).toBe("123.00");
    });
});

describe('微调器的测试', function () {
    it('初始化', function () {
        var _setup29 = setup({
            spinner: true,
            step: 1,
            value: 1
        }),
            input = _setup29.input;

        console.log(input.find('.x-input-step').length);
        expect(input.find('.x-input-step').length).toBe(1);
    });
    it('调整上下', function () {
        var _setup30 = setup({
            spinner: true,
            step: 1,
            value: 1
        }),
            input = _setup30.input;

        var up = input.find('.x-input-step-up');
        var down = input.find('.x-input-step-down');
        up.simulate('click');
        expect(input.state('value')).toBe("2");
        expect(input.state('displayValue')).toBe('2');
        down.simulate('click');
        expect(input.state('value')).toBe("1");
        expect(input.state('displayValue')).toBe('1');
    });
    it('调整上下', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return Number(v);
        };

        var _setup31 = setup({
            spinner: true,
            step: 0.01,
            value: 1,
            decimals: 2,
            onChange: onChange
        }),
            input = _setup31.input;

        var callback = _sinon2.default.spy(onChange); //监听callback
        var up = input.find('.x-input-step-up');
        var down = input.find('.x-input-step-down');
        up.simulate('click');
        expect(input.state('value')).toBe("1.01");
        expect(input.state('displayValue')).toBe('1.01');
        console.log(callback.returned(1.01));
        // expect(callback.returned(1.01)).toBe(true);
        down.simulate('click');
        expect(input.state('value')).toBe("1.00");
        expect(input.state('displayValue')).toBe('1.00');
    });
    it('设置最大最小值', function () {
        var onChange = function onChange(v) {
            console.log(v);
            return v;
        };

        var _setup32 = setup({
            spinner: true,
            step: 0.01,
            value: 2,
            decimals: 2,
            max: 5,
            min: 1,
            onChange: onChange
        }),
            input = _setup32.input;

        var callback = _sinon2.default.spy(onChange); //监听callback
        input.setProps({ value: 6 });
        expect(input.state('value')).toBe('5.00');
        console.log(callback.returned(5));
        // expect(callback.returned(5)).toBe(true);
        input.setProps({ value: 0 });
        expect(input.state('value')).toBe("1.00");
        // expect(callback.returned(1)).toBe(true);
    });
});