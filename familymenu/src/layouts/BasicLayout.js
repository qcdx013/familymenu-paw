import React from 'react';
import { Layout, Menu, Icon, Input } from 'antd';
import basicStyles from './BasicLayout.less';
import Link from 'umi/link';
import ShoppingListButton from './ShoppingListButton.js';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;

export default class BasicLayout extends React.Component {
  render() {
    return (
      <Layout>
        <Header className={basicStyles.header}>
          <Search
            className={basicStyles.searchBar}
            placeholder="搜索想吃的菜、食材"
            onSearch={value => console.log(value)}
          />
          <ShoppingListButton />
        </Header>

        <Content className={basicStyles.fullContent}>
          <Layout className={basicStyles.bgContent}>
            <Sider className={basicStyles.sider}>
              <Menu
                className={basicStyles.menu}
                mode="inline"
                //defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1', 'sub2']}
              >
                <Menu.Item key="1">
                  <Link to="/">
                    <Icon type="home" />
                    首页
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="file-text" />菜 单
                    </span>
                  }
                >
                  <Menu.Item key="2">
                    <Link to="/menu/CommonMeal">家常菜</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/menu/Breakfast">早餐</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/menu/Dessert">烘焙甜点</Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to="/menu/Staple">主食</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="coffee" />
                      我的厨房
                    </span>
                  }
                >
                <Menu.Item key='6'>
                <Link to="/mykitchen/Cupboard">食材架</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>

            <Content className={basicStyles.mainContent}>
              <div>{this.props.children}</div>
            </Content>
          </Layout>
        </Content>

        <Footer className={basicStyles.footer}>Paw @2019 Created by ppM</Footer>
      </Layout>
    );
  }
}
