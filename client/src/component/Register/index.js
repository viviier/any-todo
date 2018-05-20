import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button } from 'antd';
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
				console.log(err)
			};

			axios.post('/auth/reg', values)
				.then(res => {
					this.props.history.push('/login');
				})
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		console.log(this.props)
		return (
			<Row type="flex" justify="center" align="middle" className="wrap-register">
				<Col span={12} offset={0} md={{offset: 3}} lg={{offset: 6}}>
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