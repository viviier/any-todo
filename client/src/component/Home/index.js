import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Input, List, Avatar, Popover, Pagination } from 'antd';
import { addTodo, toggleTodo } from 'src/actions/todoActions';
import { userLoginOut } from 'src/actions/userActions';
import { splitArr } from 'common/utils';
import FilterLink from 'common/component/FilterLink';
import './index.less';

@connect(store => {
	return {
		username: store.userReducer.username,
		name: store.userReducer.name,
		list: store.todoReducer.todos,
		filter: store.todoReducer.filter
	}
})
class Home extends Component {
	state = {
		value: '',
		current: 1
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

	paginationClick(page) {
		this.setState({
			current: page
		});
	}

	userLoginOutClick(e) {
		e.preventDefault();
		this.props.dispatch(userLoginOut(this.props.history));
	}

	handleFilterLinkClick() {
		this.setState({
			current: 1
		})
	}

	// filter todo
	filterTodo(todos, filter) {
		switch (filter) {
			case 'SHOW_ALL':
				return todos
			case 'SHOW_ACTIVE':
				return todos.filter( t => !t.completed )
			case 'SHOW_COMPLETED':
				return todos.filter ( t => t.completed )
			default:
				return todos
		}
	}

	render() {
		let popverContent = () => (
			<a onClick={e => this.userLoginOutClick(e)}>login out</a>
		);

		let list = this.filterTodo(this.props.list, this.props.filter);
		let dataSource = splitArr(list, 6);
		dataSource.unshift([]);

		let paginationConfig = {
			pageSize: 6,
			current: this.state.current,
			total: list.length,
			onChange: this.paginationClick.bind(this)
		};

		if (document.body.clientWidth <= 576) {
			paginationConfig = {
				...paginationConfig,
				size: 'small'
			}
		}

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
						dataSource={dataSource[this.state.current]}
						renderItem={item => (<List.Item className={"list-item" + (item.completed ? ' completed' : '')} onClick={() => this.itemToggleClick(item.id, item)}>{item.text}</List.Item>)}
						locale={{emptyText: '开始你的第一个todo吧~'}}
					/>
					<div className="home-wrap-footer">
						<p  className="footer-filterlink"
							onClick={() => this.handleFilterLinkClick()}
						>
							<FilterLink filter="SHOW_ACTIVE">正在</FilterLink>
							<FilterLink filter="SHOW_COMPLETED">已完成</FilterLink>
							<FilterLink filter="SHOW_ALL">show all</FilterLink>
						</p>
						<Pagination 
							{...paginationConfig}
						/>
					</div>
				</Col>
			</Row>
		);
	}
}

export default Home;