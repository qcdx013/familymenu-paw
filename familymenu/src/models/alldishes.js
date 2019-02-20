import Cookies from 'universal-cookie';
import { routerRedux } from 'dva/router';
import * as alldishesService from '../services/alldishes.js';

export default {
  namespace: 'alldishes',
  state: {
    data: [],
    selected: [],
  },

  reducers: {
    saveInitial(
      state,
      {
        payload: { data },
      }
    ) {
      return { ...state, data };
    },

    addDishes(state, { payload: card }) {
      if (Array.isArray(state.selected) && state.selected.length === 0) {
        let newSelected = state.selected.concat(card);
        const cookies = new Cookies();
        cookies.set('orderedcardcookie', newSelected, {
          path: '/',
        });
        return {
          data: state.data,
          selected: newSelected,
        };
      } else if (state.selected.length > 0) {
        if (state.selected.indexOf(card) >= 0) {
          return {
            data: state.data,
            selected: state.selected,
          };
        } else {
          let newSelected = state.selected.concat(card);
          const cookies = new Cookies();
          cookies.set('orderedcardcookie', newSelected, {
            path: '/',
          });
          return {
            data: state.data,
            selected: newSelected,
          };
        }
      }
    },

    deleteDishes(
      state,
      {
        payload: { item },
      }
    ) {
      let array = [];
      for (let elem of state.selected) {
        if (elem.id !== item.id) {
          array.push(elem);
        }
      }
      return {
        data: state.data,
        selected: array,
      };
    },
  },

  effects: {
    *fetchInitial(_, { call, put }) {
      const { data } = yield call(alldishesService.getAllDishes);
      yield put({ type: 'saveInitial', payload: { data } });
    },

    *changePage(_, { put }) {
      yield put(routerRedux.push('/myingredients'));
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (
          pathname === '/' ||
          pathname === '/menu/CommonMeal' ||
          pathname === '/menu/Breakfast' ||
          pathname === '/menu/Dessert' ||
          pathname === '/menu/Staple' ||
          pathname === '/myingredients'
        ) {
          dispatch({ type: 'fetchInitial' });
        }
      });
    },
  },
};
