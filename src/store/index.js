import { createStore } from 'vuex';

// Vuexストアを作成
const store = createStore({
  state() {
    return {
      message: 'Hello Vuex'
    };
  },
  mutations: {},
  actions: {},
  getters: {}
});

export default store;