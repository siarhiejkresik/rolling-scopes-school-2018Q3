export default {
  namespaced: true,
  state: {
    name: undefined
  },
  mutations: {
    setName(state, value) {
      state.name = value;
    }
  }
};
