/*
 * @Description:
 * @Author: Ian
 * @Date: 2023-11-11 00:59:39
 * @LastEditTime: 2023-11-11 01:39:09
 * @LastEditors: Ian
 */
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      API_KEY: null,
    };
  },
  mutations: {
    ADD_API_KEY(state, item) {
      state.API_KEY = item;
    },
  },
  getters: {
    API_KEY(state) {
      return state.API_KEY;
    },
  },
});

export default store;
