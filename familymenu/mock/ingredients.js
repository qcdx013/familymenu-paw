export default {
  'GET /api/myingredients/initial': {
    ingredients: [
      {
        id: 1123,
        ingredientName: '面粉',
        unitPrice: 1.2,
        specification: '500g/袋',
      },
      {
        id: 333,
        ingredientName: '鸡蛋',
        unitPrice: 2.5,
        specification: '10个/盒',
      },
    ],
    linePrice:[
      [1123,1.2],
      [333,2.5],
    ]
  },
};
