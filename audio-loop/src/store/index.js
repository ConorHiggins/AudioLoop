import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isRunning: false,
  },
  mutations: {
    togglePlaying(state, value) {
      state.isRunning = value;
    },
  },
  actions: {
    togglePlaying(context, payload) {
      context.commit('togglePlaying', payload);
    },
  },
  getters: {
    isRunning: state => state.isRunning,
  }
})