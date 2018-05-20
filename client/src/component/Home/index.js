import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Input, List, Avatar } from 'antd';
import { addTodo } from 'src/actions/todoActions';
import './index.less';

@connect(store => {
	return {
		username: store.userReducer.username,
		name: store.userReducer.name,
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
				<div className="home-userinfo">
					<p className="info-name">{this.props.name}</p>
					<Avatar style={{ color: '#fff', backgroundColor: '#f56a00' }}>{this.props.name[0].toUpperCase()}</Avatar>
				</div>
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
						locale={{emptyText: '开始你的第一个todo吧~'}}
						pagination={{pageSize: 6}}
					/>
				</Col>
			</Row>
		);
	}
}

export default Home;