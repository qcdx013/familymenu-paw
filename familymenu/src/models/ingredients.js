import * as ingredientsService from '../services/ingredients.js';
import Cookies from 'universal-cookie';

export default {
  namespace: 'ingredients',
  state: {
    ordered: [],
    ingredients: [],
    ingredientsNumbers: [],
    linePrice: [],
  },

  reducers: {
    saveInitial(
      state,
      {
        payload: { ingredients, linePrice, loaded },
      }
    ) {
      const newOrdered = state.ordered.concat(loaded);
      const newState = Object.assign({}, state, { ingredients, linePrice });
      return {
        ordered: newOrdered,
        ingredients: newState.ingredients,
        ingredientsNumbers: state.ingredientsNumbers,
        linePrice: newState.linePrice,
      };
    },

    changeNumber(
      state,
      {
        payload: { value, record },
      }
    ) {
      let numberIdArr = [];
      let linePriceIdArr = [];
      for (let m of state.ingredientsNumbers) {
        numberIdArr.push(m[0]);
      }
      for (let n of state.linePrice) {
        linePriceIdArr.push(n[0]);
      }

      const newNumberObject = [record.id, value];
      const newLinePriceObject = [record.id, (value * record.unitPrice.slice(2)).toFixed(2)];
      if (numberIdArr.indexOf(record.id) < 0) {
        let sampleIngredientsNumbers = state.ingredientsNumbers.slice(0);
        sampleIngredientsNumbers.push(newNumberObject);
        const newIngredientsNumbers = sampleIngredientsNumbers;

        if (linePriceIdArr.indexOf(record.id) < 0) {
          let sampleLinePrice = state.linePrice.slice(0);
          sampleLinePrice.push(newLinePriceObject);
          const newLinePrice = sampleLinePrice;
          return {
            ordered: state.ordered,
            ingredients: state.ingredients,
            ingredientsNumbers: newIngredientsNumbers,
            linePrice: newLinePrice,
          };
        } else {
          for (let i in state.linePrice) {
            if (state.linePrice[i][0] == record.id) {
              let sampleLinePrice = state.linePrice.slice(0);
              sampleLinePrice[i] = newLinePriceObject;
              const newLinePrice = sampleLinePrice;
              return {
                ordered: state.ordered,
                ingredients: state.ingredients,
                ingredientsNumbers: newIngredientsNumbers,
                linePrice: newLinePrice,
              };
            }
          }
        }
      } else {
        for (let j in state.ingredientsNumbers) {
          if (state.ingredientsNumbers[j][0] == record.id) {
            let sampleIngredientsNumbers = state.ingredientsNumbers.slice(0);
            sampleIngredientsNumbers[j] = newNumberObject;
            const newIngredientsNumbers = sampleIngredientsNumbers;
            if (linePriceIdArr.indexOf(record.id) < 0) {
              let sampleLinePrice = state.linePrice.slice(0);
              sampleLinePrice.push(newLinePriceObject);
              const newLinePrice = sampleLinePrice;
              return {
                ordered: state.ordered,
                ingredients: state.ingredients,
                ingredientsNumbers: newIngredientsNumbers,
                linePrice: newLinePrice,
              };
            } else {
              for (let i in state.linePrice) {
                if (state.linePrice[i][0] == record.id) {
                  let sampleLinePrice = state.linePrice.slice(0);
                  sampleLinePrice[i] = newLinePriceObject;
                  const newLinePrice = sampleLinePrice;
                  return {
                    ordered: state.ordered,
                    ingredients: state.ingredients,
                    ingredientsNumbers: newIngredientsNumbers,
                    linePrice: newLinePrice,
                  };
                }
              }
            }
          }
        }
      }
    },

    delete(
      state,
      {
        payload: { record },
      }
    ) {
      let newIngredients = [];
      for (let i in state.ingredients) {
        if (state.ingredients[i].id !== record.id) {
          newIngredients.push(state.ingredients[i]);
          return {
            ordered: state.ordered,
            ingredients: newIngredients,
            ingredientsNumbers: state.ingredientsNumbers,
            linePrice: state.linePrice,
          };
        }
      }
    },
  },

  effects: {
    *fetchInitial(_, { call, put }) {
      const cookies = new Cookies();
      const loaded = cookies.get('orderedcardcookie');
      const { ingredients } = yield call(ingredientsService.initialIngredients);
      const { linePrice } = yield call(ingredientsService.initialIngredients);
      yield put({
        type: 'saveInitial',
        payload: { ingredients, linePrice, loaded },
      });
    },

    *submitShoppingList(
      {
        payload: { values },
      },
      { call }
    ) {
      yield call(ingredientsService.submitList, values);
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/myingredients') {
          dispatch({ type: 'fetchInitial' });
        }
      });
    },
  },
};
