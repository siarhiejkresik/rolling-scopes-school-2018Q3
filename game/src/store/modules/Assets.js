/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import config from '../../scripts/preload/assets';
import preloader from '../../scripts/preload/preloader';

const state = {
  isLoaded: false,
  resources: undefined,
};

const mutations = {
  setLoadedStatus(state, status) {
    state.isLoaded = status;
  },
  setResources(state, resources) {
    state.resources = resources;
  },
};

const actions = {
  load(context) {
    preloader(config).then((resources) => {
      context.commit('setResources', resources);
      context.commit('setLoadedStatus', true);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
