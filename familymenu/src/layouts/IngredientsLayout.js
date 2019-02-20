import React from 'react';
import { Layout, Input } from 'antd';
import ShoppingListButton from './ShoppingListButton.js';
import ingredientsStyles from './IngredientsLayout.less';

const { Header, Content, Footer } = Layout;
const Search = Input.Search;

export default class IngredientsLayout extends React.Component {
  render() {
    return (
      <Layout>
        <Header className={ingredientsStyles.header}>
          <Search
            className={ingredientsStyles.searchBar}
            placeholder="搜索想吃的菜、食材"
            onSearch={value => console.log(value)}
          />
          <ShoppingListButton />
        </Header>

        <Content className={ingredientsStyles.fullContent}>
            <div className={ingredientsStyles.contentDiv}>{this.props.children}</div>
        </Content>

        <Footer className={ingredientsStyles.footer}>Paw @2019 Created by ppM</Footer>
      </Layout>
    );
  }
}
