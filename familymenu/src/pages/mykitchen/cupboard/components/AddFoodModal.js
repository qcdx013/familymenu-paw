import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

class PreAddFoodModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModalHandler = e => {
    if (e) {
      e.stopPropagation;
    }
    this.setState({
      visible: true,
    });
  };

  hideModalHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModalHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { food, number, foodClass } = this.props.record;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModalHandler}>{children}</span>
        <Modal
        title='添加新食材'
        visible={this.state.visible}
        onOk={this.okHandler}
        onCancel={this.hideModalHandler}
        >
        <Form layout="horizontal" onSubmit={this.okHandler}>
          <FormItem {...formItemLayout} label='食材'>
            {getFieldDecorator('food', {
              rules: [
                {
                  required: true,
                  message: '请输入食材！',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label='数量'>
            {getFieldDecorator('number', {
              rules: [
                {
                  required: true,
                  message: '请输入食材数量！',
                },
              ],
            })(<InputNumber min={1} max={100000} />)}
          </FormItem>
          <FormItem {...formItemLayout} label='种类'>
            {getFieldDecorator('foodClass', {
              rules: [
                {
                  required: true,
                  message: '请输入食材种类！',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(PreAddFoodModal);
