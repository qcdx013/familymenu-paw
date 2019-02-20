import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import loginStyles from './index.less';

const FormItem = Form.Item;


class NormalLoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      errorMessage : null,
    }
  }

  setErrorMsg = (msg) => {
    this.setState({
      errorMessage: msg
    })
  }

  handleSubmit = e => { 
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form:', values);
      }
    });
    
    const formData = this.props.form.getFieldsValue();
    const data = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(formData),
    };


    function checkStatus(response) {
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }

    function reDirect() {
      window.location.href = 'http://localhost:8000';
    }

    fetch('/api/doLogin', data)
      .then(response => {
        return checkStatus(response);
      })
      .then(response => response.json())
      .then(response => {
        if (response.result === 'SUCCESS') {
          reDirect();
        }else{
          this.setErrorMsg(response.data)
        }
      })
      .catch((err) => {
        this.setErrorMsg("Invalid Password")
      });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={loginStyles.loginForm}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: 'Please input your username!',
              },
            ],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13}} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <span className={loginStyles.errorMsg}>{this.state.errorMessage}</span>
       
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className={loginStyles.loginFormForgot} href="">
            Forgot password
          </a>
          <Button type='primary' htmlType="submit" className={loginStyles.loginFormButton}> 
            Log in
          </Button>
          Or
          <a className={loginStyles.register} href="">
            Register now!
          </a>
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

export default Login;
