import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Icon, Input, Button, notification } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import './index.less';

const FormItem = Form.Item;

@connect()
@Form.create()
class Register extends Component {

	componentWillMount() {
		let token = localStorage.getItem('token');

		if (token) {
			this.props.history.push('/');
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		
		this.props.form.validateFields((err, values) => {
			if (err) {
				console.log(err);
			};

			axios.post('/auth/reg', values)
				.then(res => {
					this.props.history.push('/login');

					notification['success']({
						message: '注册成功',
						duration: 3
					});
				})
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Row type="flex" justify="center" align="middle" className="wrap-register">
				<Col span={20} offset={0} xs={{offset: 2}} md={{offset: 3}} lg={{offset: 6, span: 12}}>
					<h1>注册</h1>

					 <Form className="register-form">
					 	<div className="register-form-items">
					 		<FormItem>
								{getFieldDecorator('name', {
									rules: [{ required: true, message: 'Please input your name!' }],
								})(
									<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
								)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('username', {
									rules: [{ required: true, message: 'Please input your username!' }],
								})(
									<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
								)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('password', {
									rules: [{ required: true, message: 'Please input your Password!' }]
								})(
									<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
								)}
					        </FormItem>
				        </div>

						<Link to="/login" className="register-form-login">> login now!</Link>						
						<Button type="primary" htmlType="submit" className="register-form-button" onClick={(e) => this.handleSubmit(e)}>
							Register
						</Button>
			       </Form>
				</Col>
		    </Row>
		);
	}
}

export default Register;