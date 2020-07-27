import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isRunning: false,
    numberOfSteps: 8,
    numberOfTracks: 8,
    bank: 1,
    speed: 500,
    tracks: []
  },

  mutations: {
    initTracks(state, newBank=null) {
      if (newBank){
        state.bank = newBank;
      }
      const arr = Array.from(Array(state.numberOfTracks).keys());
      state.tracks = arr.map((i) => {
        return {
          source: `/banks/${state.bank}/${i+1}.wav`,
          volume: 80
        }
      });
    },

    togglePlaying(state, value) {
      state.isRunning = value;
    },

    resetProperties(state) {
      state.isRunning = false;
    },

    updateSpeed(state, value) {
      state.speed = value;
    }
  },

  actions: {
    initTracks(context, payload) {
      context.commit('initTracks', payload)
    },
    togglePlaying(context, payload) {
      context.commit('togglePlaying', payload);
    },
    reset(context) {
      context.commit('resetProperties');
      context.commit('initTracks', 1);
    },
    updateSpeed(context, payload) {
      context.commit('updateSpeed', payload);
    }
  },

  getters: {
    isRunning: state => state.isRunning,
    numberOfSteps: state => state.numberOfSteps,
    numberOfTracks: state => state.numberOfTracks,
    speed: state => state.speed,
    tracks: state => state.tracks,
  }
})