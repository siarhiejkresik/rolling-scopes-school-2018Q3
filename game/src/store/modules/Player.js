/* eslint-disable no-param-reassign */
export default {
  namespaced: true,
  state: {
    name: undefined,
    lastScore: undefined,
  },
  mutations: {
    setName(state, value) {
      state.name = value;
    },
    setLastScore(state, value) {
      state.lastScore = value;
    },
  },
};
