/*
 * @Descripttion: 数字输入框
 * @Author: tianxiangbing
 * @Date: 2020-04-16 18:45:09
 * @LastEditTime: 2020-04-23 19:20:24
 * @github: https://github.com/tianxiangbing
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class NumberInput extends React.PureComponent {
    static displayName = "NumberInput";
    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        returnType: PropTypes.string,
        decimals: PropTypes.number,
        isFormat: PropTypes.bool,//是否格式化
    }
    static defaultProps = {
        returnType: 'Number',
        decimals: 0,
        isFormat: false//默认不格式化
    }
    //千分位
    formatThousandthNumber(num, isAutoZero = false) {
        let { decimals, isFormat } = this.props;
        if (!isFormat) {
            return num;
        }
        // number = number.replace(/\,/g,'');
        num = String(num).replace(/\,/g, '');
        let isnegative = false;
        if (num.indexOf('-') == 0) {
            num = num.replace(/\-/gi, '');
            isnegative = true;
        }
        let arr = num.split('.');
        let number = arr[0]
        // let decimals  = arr.length>1 ?arr[1].length:0;
        if (typeof (number) == undefined) return '';
        if (!number && number !== 0) {
            return '';
        } else {
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            let n = +number,
                prec = 0,
                sep = ',',
                dec = '.',
                s = '';
            s = (prec ? n.fromFixed(prec) : '' + Math.round(n)).split('.');
            var re = /(-?\d+)(\d{3})/;
            while (re.test(s[0])) {
                s[0] = s[0].replace(re, "$1" + sep + "$2");
            }

            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            let str = s.join(dec);
            //这里根据isAutoZero进行补0，如果已经是小数，则分隔小数位补0，如果是整数，加小数点补
            if (arr.length > 1) {
                //add autozero
                let decnum = arr[1].substr(0, decimals).replace(/[^0-9]/ig, "");
                if (isAutoZero) {
                    decnum = decnum + Array(decimals + 1).join(0).slice(0, Math.max(0, decimals - arr[1].length) );
                }
                str += '.' + decnum;
            } else {
                if (isAutoZero) {
                    str += '.' + Array(decimals + 1).join(0);
                }
            }
            if (decimals === 0) {
                str = str.split('.')[0];
            }
            if (isnegative) {
                return '-' + str;
            }
            return str;
        }
    }
    constructor(props) {
        super(props);
        let { value, decimals } = props;
        this.state = { value, displayValue: this.formatThousandthNumber(value, true) };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        console.log('willreceive被调用....')
        console.log(nextProps.value)
        let { value } = this.props;
        if (nextProps.value !== value || nextProps.value !== this.state.value) {
            // console.log(nextProps.value)
            this.changeState(nextProps.value, true)
        }
    }
    //统一返回值
    returnValue(value) {
        let { returnType = 'Number', onChange } = this.props;
        console.log(value)
        console.log(returnType)
        value = window[returnType](value);
        console.log(value)
        onChange && onChange(value);
    }
    onChange(e) {
        let { value } = e.target;
        this.changeState(value)
    }
    onBlur(e) {
        //在blur里只作补0，然后调用props上的blur
        let displayValue = this.formatThousandthNumber(this.state.value, true);
        if (displayValue !== this.state.displayValue) {
            this.setState({displayValue})
        }
        this.props.onBlur && this.props.onBlur(e);
    }
    //统一修改value值
    changeState(value, isAutoZero) {
        let v = String(value).replace(/\,/gi, '');
        //判断是否为数字，不是则为空
        if (isNaN(v)) {
            v = '';
        }
        //转换为字符串进行比较，先去除逗号
        if (v !== String(this.state.value)) {
            this.setState({ value: v, displayValue: this.formatThousandthNumber(v, isAutoZero) }, () => {
                this.returnValue(v);
            });
        }
    }
    render() {
        let { displayValue } = this.state;
        return (
            <input type="text" onBlur={this.onBlur} className="x-input" value={displayValue} onChange={this.onChange} />
        )
    }
}