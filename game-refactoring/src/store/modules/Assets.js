import config from '../../scripts/preload/assets/index.js';
import load from '../../scripts/preload/preloader';

const state = {
  isLoaded: false,
  resources: undefined
};

const mutations = {
  load(state) {
    // TODO: fix `Error: [vuex] Do not mutate vuex store state outside mutation handlers.`
    load(config).then(resources => {
      state.resources = resources;
      state.isLoaded = true;
    });
  }
};

const actions = {
  load(context) {
    context.commit('load');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
