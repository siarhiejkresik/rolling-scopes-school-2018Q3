import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store';

import './assets/styles/index.css';

Vue.use(BootstrapVue);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
