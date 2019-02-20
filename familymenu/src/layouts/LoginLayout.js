import { Component } from 'react';
import { Layout } from 'antd';
import loginStyles from './LoginLayout.less';

const { Header, Footer, Content } = Layout;

export default class LoginLayout extends Component {
  render() {
    return (
      <Layout>
        <Header className={loginStyles.header} />
        <Content className={loginStyles.content}>
          <div className={loginStyles.loginPart}>{this.props.children}</div>
        </Content>
        <Footer className={loginStyles.footer}>Paw @2019 Created by ppM</Footer>
      </Layout>
    );
  }
}
