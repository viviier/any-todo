import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Input, List } from 'antd';
import { addTodo } from 'src/actions/todoActions';
import './index.less';

@connect(store => {
	return {
		username: store.userReducer.username,
		list: store.todoReducer
	}
})
class Home extends Component {
	state = {
		value: ''
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		})
	}

	handleClick() {
		this.props.dispatch(addTodo(this.props.username, this.state.value));

		this.setState({
			value: ''
		})
	}

	render() {
		return (
			<Row type="flex" justify="center" align="middle" className="wrap-home">
				<Col span={12} lg={{span: 10}}>
					<Input
						placeholder="Enter your todo..."
						suffix={<Icon type="plus" style={{ color: 'rgba(0,0,0,.25)', cursor: 'pointer' }} onClick={() => this.handleClick()}/>}
						value={this.state.value}
						onChange={e => this.handleChange(e)}
						onPressEnter={() => this.handleClick()}
					/>
					<List
						dataSource={this.props.list}
						renderItem={item => (<List.Item>{item.text}</List.Item>)}
					/>
				</Col>
			</Row>
		);
	}
}

export default Home;