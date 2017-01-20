
import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
// import Mint from 'mint-ui';
// import 'mint-ui/lib/style.css'

import routes from './routers.js';

// Vue.use(Mint);
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

const app = new Vue({
  router
}).$mount('#app');
