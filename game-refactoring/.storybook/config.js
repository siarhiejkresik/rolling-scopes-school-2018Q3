import { configure } from '@storybook/vue';

import Vue from 'vue';
import Vuex from 'vuex';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import LoginView from '../src/screens/LoginView.vue';

Vue.use(Vuex);
Vue.use(BootstrapVue);

Vue.component('login-view', LoginView);

function loadStories() {
  require('../src/stories/index.js');
}

configure(loadStories, module);
