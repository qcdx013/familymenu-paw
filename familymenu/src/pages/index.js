import React, { Component } from 'react';
import { Card, Icon, Tag } from 'antd';
import { connect } from 'dva';
import Masonry from 'react-masonry-component';

const { Meta } = Card;

const namespace = 'alldishes';

const mapStateToProps = state => {
  const cardList = state[namespace].data;
  const selectedCard = state[namespace].selected;
  console.log(cardList);
  return {
    cardList,
    selectedCard,
  };
};

@connect(mapStateToProps)
export default class MenuAll extends Component {
  render() {
    const elements = this.props.cardList.map(card => {
      return (
        <div>
          <Card
            key={card.id}
            hoverable
            style={{ width: 240, margin: '20px 20px', float: 'left' }}
            cover={<img alt={card.dishname} src={card.imgsrc} />}
          >
            <Meta
              title={
                <div>
                  <div style={{ display: 'inline' }}>{card.dishname}</div>
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
        </div>
      );
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