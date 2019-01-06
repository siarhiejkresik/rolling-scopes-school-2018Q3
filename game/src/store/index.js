import Vue from 'vue';
import Vuex from 'vuex';

import assets from './modules/Assets';
import player from './modules/Player';
import records from './modules/Records';
import storage from './modules/Storage';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    assets,
    player,
    records,
    storage,
  },
  strict: debug,
});
