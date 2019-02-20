import * as cupboardService from '../services/cupboard';

export default {
  namespace: 'cupboard',
  state: {
    list: [],
  },

  reducers: {
    save(
      state,
      {
        payload: { data },
      }
    ) {
      return { ...state, ...data };
    },
  },

  effects: {
    *add({ payload: values }, { call, put }) {
      yield call(cupboardService.add, values);
      yield put({ type: 'reload' });
    },

    *patch(
      {
        payload: { id, values },
      },
      { call, put }
    ) {
      yield call(cupboardService.patch, id, values);
      yield put({ type: 'reload' });
    },

    *reload(_, { call, put }) {
      const data = yield call(cupboardService.fetch);
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },

    *remove({ payload: id }, { call, put }) {
      yield call(cupboardService.remove, id);
      yield put({ type: 'reload' });
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (
          pathname === '/mykitchen/Cupboard') {
          dispatch({ type: 'reload' });
        }
      });
    },
  }
};
