import model from '../../assets/images/models/model';
import { imageLoader, loadResources } from '../../scripts/preloader.js';

const state = {
  isLoaded: false,
  resources: []
};

const mutations = {
  load(state) {
    loadResources(model, imageLoader).then(imgs => {
      // TODO: fix "Error: [vuex] Do not mutate vuex store state outside mutation handlers."
      state.resources.push(imgs);
      mutations.setLoaded(state);
    });
  },
  setLoaded(state) {
    state.isLoaded = true;
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
