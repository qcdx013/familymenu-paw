import React from 'react';
import { Card, Icon, Tag } from 'antd';
import { connect } from 'dva';
import Masonry from 'react-masonry-component';

const { Meta } = Card;

const namespace = 'alldishes';

const mapStateToProps = state => {
  const cardList = state[namespace].data;
  const selectedCard = state[namespace].selected;
  return {
    cardList,
    selectedCard,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderNewDish: card => {
      dispatch({
        type: `${namespace}/addDishes`,
        payload: card,
      });
    },
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class MenuList extends React.Component {
  render() {
    const elements = this.props.cardList.map(card => {
      if (card.group.indexOf(this.props.keyword) !== -1) {
        return (
          <Card
            key={card.id}
            hoverable
            style={{ width: 240, margin: '20px 10px', float: 'left' }}
            cover={<img alt={card.dishname} src={card.imgsrc} />}
          >
            <Meta
              title={
                <div>
                  <div style={{ display: 'inline' }}>{card.dishname}</div>
                  <div
                    style={{ float: 'right' }}
                    onClick={() => {
                      this.props.orderNewDish(card);
                    }}
                  >
                    {<Icon type="plus" />}
                  </div>
                </div>
              }
            />
            <br />
            <div>
              <Icon type="tags" style={{ marginRight: 10 }} />
              {card.ingredients.map(ingredient => {
                return <Tag key={ingredient}>{ingredient}</Tag>;
              })}
            </div>
          </Card>
        );
      }
    });
    return (
      <Masonry
        className={'my-gallery-class'}
        elementType={'div'}
        options={{ transitionDuration: 5, transitionProperty: 'width' }}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
      >
        {elements}
      </Masonry>
    );
  }
}
