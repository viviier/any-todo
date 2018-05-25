import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Icon, Input, Button } from 'antd';
import { userLogin } from 'src/actions/userActions';
import './index.less';

const FormItem = Form.Item;

@connect()
@Form.create()
class Login extends Component {
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
			}
			
			this.props.dispatch(userLogin(values, this.props.history));
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Row type="flex" justify="center" align="middle" className="wrap-login">
				<Col span={20} offset={0} xs={{offset: 4}} md={{offset: 3}} lg={{offset: 6, span: 12}}>
					<h1>登录</h1>

					 <Form className="login-form">
					 	<div className="login-form-items">
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

						<Link to="/register" className="login-form-register">> register now!</Link>
						<Button type="primary" htmlType="submit" className="login-form-button" onClick={(e) => this.handleSubmit(e)}>
							Log in
						</Button>
			       </Form>
				</Col>
		    </Row>
		);
	}
}

export default Login;
