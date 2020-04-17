/*
 * @Descripttion: 数字输入框
 * @Author: tianxiangbing
 * @Date: 2020-04-16 18:45:09
 * @LastEditTime: 2020-04-17 16:24:28
 * @github: https://github.com/tianxiangbing
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class NumberInput extends React.PureComponent {
    static displayName ="NumberInput";
    static propTypes = {
        onChange:PropTypes.func,
        value:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    }
    constructor(props){
        super(props);
        let {value} = props;
        this.state={value};
        this.onChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps){
        let {value,onChange} = this.props;
        if(nextProps.value !==this.props.value && nextProps.value !==this.state.value){
            console.log(nextProps.value)
            this.setState({value:nextProps.value},()=>{
                //值改变后,触发onChange事件
                console.log(this.state.value)
                onChange&&onChange(this.state.value)
            });
        }
    }
    onChange(e){
        let {value} = e.target;
        let {onChange} = this.props;
        if(value!==String(this.state.value)){
            this.setState({value:e.target.value},()=>{
                onChange&&onChange(this.state.value);
            });
        }
    }
    render() {
        return (
            <span>
                <input type="text" className="x-input" value={this.state.value} onChange={this.onChange}/>
            </span>
        )
    }
}