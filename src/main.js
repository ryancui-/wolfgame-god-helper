import Vue from 'vue';
import VueRouter from 'vue-router';
import Mint from 'mint-ui';
import App from './App.vue';
import 'mint-ui/lib/style.css'

import routes from './routers.js';

Vue.use(Mint);
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
