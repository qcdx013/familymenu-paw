// import tomato from '../src/assets/tomatoandegg.jpeg';
// import hongshaorou from '../src/assets/hongshaorou.jpeg';
// import cake from '../src/assets/cake.jpg';
// import mantou from '../src/assets/mantou.jpg';
// import noodle from '../src/assets/noodle.jpg';
// import potato from '../src/assets/potatoandbeef.jpeg';
// mock文件中不使用 import;

export default {
  'GET /api/alldishes': {
    data: [
      {
        id: 1,
        dishname: '西红柿炒蛋',
        imgsrc: 'tomato',
        ingredients: ['西红柿', '鸡蛋'],
        group: ['commonMeal'],
      },
      {
        id: 2,
        dishname: '红烧肉',
        imgsrc: 'hongshaorou',
        ingredients: ['五花肉'],
        group: ['commonMeal'],
      },
      {
        id: 3,
        dishname: '咖喱牛肉',
        imgsrc: 'potato',
        ingredients: ['牛肉', '胡萝卜', '洋葱', '土豆', '咖喱'],
        group: ['commonMeal'],
      },
      {
        id: 4,
        dishname: '阳春面',
        imgsrc: 'noodle',
        ingredients: ['面条', '猪油', '小葱', '酱油'],
        group: ['staple', 'breakfast'],
      },
      {
        id: 5,
        dishname: '馒头',
        imgsrc: 'mantou',
        ingredients: ['面粉', '酵母', '白砂糖'],
        group: ['breakfast', 'staple'],
      },
      {
        id: 6,
        dishname: '戚风蛋糕',
        imgsrc: 'cake',
        ingredients: ['低筋面粉', '鸡蛋', '白砂糖', '牛奶', '清油'],
        group: ['breakfast', 'dessert'],
      },
    ],
  },
};
