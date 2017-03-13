/**
 * Created by ryancui on 2017/1/19.
 */

import NewGame from './components/newgame.vue';
import Wolf from './components/dark/wolf.vue';
import Setting from './components/setting.vue';

const routes = [{
    path: '/',
    component: NewGame
  }, {
    path: '/dark/wolf',
    component: Wolf
  }, {
    path: '/setting',
  component: Setting
}];

export default routes;