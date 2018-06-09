import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Input, List, Avatar, Popover, Pagination, Button, Checkbox } from 'antd';
import { addTodo, toggleTodo, deleteTodos } from 'src/actions/todoActions';
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
		current: 1,
		isConfig: false,
		deleteTodos: []
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
		});
	}

	handleConfigClick() {
		this.setState({
			isConfig: true
		});
	}

	itemDeleteClick(e, id) {
		if (e.target.tagName === 'INPUT') {
			if (e.target.checked) {
				this.setState({
					deleteTodos: [
						...this.state.deleteTodos,
						id
					]
				});
			} else {
				this.setState({
					deleteTodos: this.state.deleteTodos.filter(item => {
						return item !== id
					})
				});
			}
		}
	}

	handleDeleteClick() {
		if (!this.state.deleteTodos.length) {
			this.setState({
				isConfig: false
			});
			return ;
		}

		this.props.dispatch(deleteTodos(this.props.username, this.state.deleteTodos));
		this.setState({
			isConfig: false,
			deleteTodos: []
		});
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
	
	// // fix分页溢出问题
	// paginationOverflow(p, s) {
	// 	/**
	// 	 * @解决方案
	// 	 * 每一次新增item或者当前的pageSize变更，就去判断pagination的宽度是否到了父元素宽度的一半，如果到了就变为
	// 	 */
	// 	console.log(p, s)
	// }

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
			size: 'small',
			onChange: this.paginationClick.bind(this)
		};

		if (document.body.clientWidth <= 576) {
			paginationConfig = {
				...paginationConfig,
				simple: true
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
					<div className="home-config">
						{
							this.state.isConfig
							? (<p 
									style={{ cursor: 'pointer' }}
									onClick={() => this.handleDeleteClick()}>
									<Button shape="circle" icon="check" size="small" style={{color: '#1890ff', marginRight: '6px'}} /> 完成
								</p>
							)
							: (
								<a 
									onClick={() => this.handleConfigClick()}
								>
									Config
								</a>
							)
						}
					</div>
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
						renderItem={item => (
							<List.Item 
								className={"list-item" + (item.completed ? ' completed' : '')} 
								onClick={e => this.state.isConfig ? this.itemDeleteClick(e, item.id) : this.itemToggleClick(item.id, item)}
							>
								{
									this.state.isConfig
									? (
										<Checkbox>{item.text}</Checkbox>
									)
									: item.text
								}
							</List.Item>
						)}
						locale={{
							emptyText: (this.props.filter === 'SHOW_COMPLETED' && this.props.list.length)
							? '加油完成你的第一个todo任务吧~' 
							: '开始你的第一个todo吧~'
						}}
					/>
					<div className="home-wrap-footer">
						<Pagination
							{...paginationConfig}
							className="fotter-pagination"
						/>
						<p  className="footer-filterlink"
							onClick={() => this.handleFilterLinkClick()}
						>
							<FilterLink filter="SHOW_ACTIVE">正在</FilterLink>
							<FilterLink filter="SHOW_COMPLETED">已完成</FilterLink>
							<FilterLink filter="SHOW_ALL">show all</FilterLink>
						</p>
					</div>
				</Col>
			</Row>
		);
	}
}

export default Home;