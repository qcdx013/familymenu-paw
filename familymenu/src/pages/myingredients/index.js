import React, { Component } from 'react';
import { Table, Popconfirm, InputNumber, Button } from 'antd';
import { connect } from 'dva';

const namespace = 'ingredients';

const mapStateToProps = state => {
  const orderedCard = state[namespace].ordered;
  const ingredientsList = state[namespace].ingredients;
  const ingredientsNumbers = state[namespace].ingredientsNumbers;
  const linePrice = state[namespace].linePrice;
  return {
    orderedCard,
    ingredientsList,
    ingredientsNumbers,
    linePrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitShoppingListButton: values => {
      dispatch({
        type: `${namespace}/submitShoppingList`,
        payload: { values },
      });
    },

    handleChange: (value, record) => {
      dispatch({
        type: `${namespace}/changeNumber`,
        payload: { value, record },
      });
    },

    handleDelete: record => {
      dispatch({
        type: `${namespace}/delete`,
        payload: { record },
      });
    },
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class MyIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: true,
      inputNumberValue: 0,
    };
    this.columns = [
      {
        title: '食材',
        dataIndex: 'ingredients',
        key: 'ingredients',
        align: 'center',
      },
      {
        title: '规格',
        dataIndex: 'specification',
        key: 'specification',
        align: 'center',
      },
      {
        title: '单价',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        align: 'center',
      },
      {
        title: '数量',
        dataIndex: 'number',
        key: 'number',
        align: 'center',
        render: (text, record) => (
          <InputNumber
            size="small"
            style={{ width: 60 }}
            min={1}
            defaultValue={1}
            onChange={value => {
              this.props.handleChange(value, record);
            }}
          />
        ),
      },
      {
        title: '金额',
        dataIndex: 'sum',
        key: 'sum',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, record) => (
          <Popconfirm
            title="确定要删除该食材吗？"
            onConfirm={() => {
              this.props.handleDelete(record);
            }}
          >
            <a>删除</a>
          </Popconfirm>
        ),
      },
    ];
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const data = [];
    this.props.orderedCard.map(card => {
      return card.ingredients.map(ingredient => {
        for (let i of this.props.ingredientsList) {
          if (i['ingredientName'] == ingredient) {
            for (let j in this.props.linePrice) {
              if (this.props.linePrice[j][0] == i.id) {
                return data.push({
                  id: i.id,
                  ingredients: ingredient,
                  specification: i['specification'],
                  unitPrice: `¥ ${i['unitPrice']}`,
                  sum: `¥ ${this.props.linePrice[j][1]}`,
                });
              }
            }
          }
        }
      });
    });

    return (
      <div>
        <Table
          rowSelection={rowSelection}
          columns={this.columns}
          dataSource={data}
          pagination={false}
          loading={this.state.loading}
        />
        <div style={{ height: 30 }} />
        <Button
          type="primary"
          style={{ float: 'right' }}
          onClick={() => {
            this.props.submitShoppingListButton(this.state.selectedRowKey);
          }}
        >
          提交订单
        </Button>
      </div>
    );
  }
}
