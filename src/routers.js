/**
 * Created by ryancui on 2017/1/19.
 */

import Wolf from './components/wolf.vue';
import Setting from './components/setting.vue';

const routes = [{
  path: '/',
  component: Setting
}, {
  path: '/dark/wolf',
  component: Wolf
}];

export default routes;