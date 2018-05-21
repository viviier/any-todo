import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Input, List, Avatar, Popover } from 'antd';
import { addTodo, toggleTodo } from 'src/actions/todoActions';
import { userLoginOut } from 'src/actions/userActions';
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

	itemToggleClick(id, item) {
		let todo = {
			...item,
			completed: !item.completed
		};
		
		this.props.dispatch(toggleTodo(this.props.username, id, todo))
	}

	userLoginOutClick(e) {
		e.preventDefault();
		this.props.dispatch(userLoginOut(this.props.history));
	}

	render() {
		let popverContent = () => (
			<a onClick={e => this.userLoginOutClick(e)}>login out</a>
		);
		
		return (
			<Row type="flex" justify="center" align="middle" className="wrap-home">
				<div className="home-userinfo">
					<p className="info-name">{this.props.name}</p>
					<Popover placement="bottom" content={popverContent()}>
						<Avatar style={{ color: '#fff', backgroundColor: '#f56a00' }}>{this.props.name[0].toUpperCase()}</Avatar>
					</Popover>
				</div>
				<Col span={20} lg={{span: 10}}>
					<Input
						size="large"
						placeholder="Enter your todo..."
						suffix={<Icon type="plus" style={{ color: 'rgba(0,0,0,.25)', cursor: 'pointer' }} onClick={() => this.handleClick()}/>}
						value={this.state.value}
						onChange={e => this.handleChange(e)}
						onPressEnter={() => this.handleClick()}
					/>
					<List
						dataSource={this.props.list}
						renderItem={item => (<List.Item className={"list-item" + (item.completed ? ' completed' : '')} onClick={() => this.itemToggleClick(item.id, item)}>{item.text}</List.Item>)}
						locale={{emptyText: '开始你的第一个todo吧~'}}
						pagination={{pageSize: 6}}
					/>
				</Col>
			</Row>
		);
	}
}

export default Home;