import React from 'react';
import { Button, Dropdown, Icon, List, Avatar, Badge } from 'antd';
import { connect } from 'dva';

const namespace = 'alldishes';

const mapStateToProps = state => {
  const orderedCard = state[namespace].selected;
  return {
    orderedCard,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleDelete: item => {
      dispatch({
        type: `${namespace}/deleteDishes`,
        payload: { item },
      });
    },

    handleChangePage: () => {
      dispatch({
        type:`${namespace}/changePage`,
      })
    },
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class ShoppingListButton extends React.Component {
  state = {
    visible: false,
  };

  handleClick = () => {
    this.setState({ visible: false });
    this.props.handleChangePage();
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  render() {
    const products = (
      <div>
        <div style={{ margin: 10 }}>
          <div style={{ fontWeight: 'bold' }}>已点的菜肴：</div>
          <List
            style={{ margin: 10 }}
            itemLayout="horizontal"
            dataSource={this.props.orderedCard}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <span
                    onClick={() => {
                      this.props.handleDelete(item);
                    }}
                  >
                    删除
                  </span>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.imgsrc} shape="square" size="large" />}
                  title={item.dishname}
                />
              </List.Item>
            )}
          />
        </div>
        <Button
          onClick={this.handleClick}
          type="primary"
          style={{ float: 'right', marginTop: 15, marginRight: 10 }}
        >
          查看我的食材清单
        </Button>
      </div>
    );

    return (
      <Dropdown
        overlay={products}
        placement="bottomCenter"
        overlayStyle={{
          background: 'white',
          width: 300,
          border: 'solid #d3d5d4 1px',
          paddingBottom: 10,
        }}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      >
        <div style={{ position: 'absolute', left: '86%', top: '0.5vh', margin: 0 }}>
          <Badge count={this.props.orderedCard.length}>
            <Icon style={{ fontSize: '25px' }} type="profile" />
          </Badge>
        </div>
      </Dropdown>
    );
  }
}
