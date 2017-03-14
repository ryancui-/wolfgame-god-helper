import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Mint from 'mint-ui';
import App from './App.vue';
import storeDefine from './store/store';
import 'mint-ui/lib/style.css'

import routes from './routers.js';

Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  routes
});

const store = new Vuex.Store(storeDefine);

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
