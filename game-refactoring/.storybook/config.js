import { configure } from '@storybook/vue';

import Vue from 'vue';
import Vuex from 'vuex';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import LoginView from '../src/screens/LoginView.vue';
import Modal from '../src/components/Modal.vue';
import ModalWrapper from '../src/stories/ModalWrapper.vue';

Vue.use(Vuex);
Vue.use(BootstrapVue);

Vue.component('login-view', LoginView);
Vue.component('modal', Modal);
Vue.component('modal-wrapper', ModalWrapper);

function loadStories() {
  require('../src/stories/index.js');
}

configure(loadStories, module);
