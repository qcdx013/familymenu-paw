import React from 'react';
import { connect } from 'dva';
import { Table, Button, Divider, Popconfirm } from 'antd';
import AddFoodModal from './AddFoodModal.js';

const namespace = 'cupboard';

const mapStateToProps = state => {
  const { list } = state.cupboard;
  return {
    list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDidMount: () => {
      dispatch({
        type: `${namespace}/reload`,
      });
    },
    addFoodHandler: values => {
      dispatch({
        type: `${namespace}/add`,
        payload: values,
      });
    },
    editFoodHandler: (id, values) => {
      dispatch({
        type: `${namespace}/patch`,
        payload: { id, values },
      });
    },
    deleteFoodHandler: id => {
      dispatch({
        type: `${namespace}/remove`,
        payload: id,
      });
    },
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Cupboard extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '食材',
        dataIndex: 'food',
        key: 'food',
        align: 'center',
      },
      {
        title: '数量',
        dataIndex: 'number',
        key: 'number',
        align: 'center',
      },
      {
        title: '分类',
        dataIndex: 'foodClass',
        key: 'foodClass',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, record) => (
          <span>
            <AddFoodModal
              record={record}
              onOk={() => {
                this.props.editFoodHandler(record.id);
              }}
            >
              <a>编辑</a>
            </AddFoodModal>
            <Divider type="vertical" />
            <Popconfirm
              title="确定要删除该食材吗？"
              onConfirm={() => {
                this.props.deleteFoodHandler(record.id);
              }}
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
  }

  componentDidMount() {
    this.props.onDidMount;
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <AddFoodModal
            record={{}}
            onOk={() => {
              this.props.addFoodHandler(values);
            }}
          >
            <Button type="primary">添加食材</Button>
          </AddFoodModal>
        </div>
        <Table
          columns={this.columns}
          dataSource={this.props.list}
          rowKey={record => record.id}
          pagination={false}
        />
      </div>
    );
  }
}
