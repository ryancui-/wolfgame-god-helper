// Import Mint-UI components
import { Picker, Actionsheet, Header, Button, Checklist } from 'mint-ui';
Vue.component(Picker.name, Picker);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Checklist.name, Checklist);

import VueRouter from 'vue-router';
import Vuex from 'vuex';
Vue.use(VueRouter);
Vue.use(Vuex);

import Vue from 'vue';
import App from './App.vue';
import storeDefine from './store/store';
import './css/common.css';
import routes from './routers.js';

const router = new VueRouter({
  routes,
});

const store = new Vuex.Store(storeDefine);

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
