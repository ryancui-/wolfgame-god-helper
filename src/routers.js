/**
 * Created by ryancui on 2017/1/19.
 */

import NewGame from './components/newgame.vue';
import Wolf from './components/dark/wolf.vue';

const routes = [
  {
    path: '/new',
    component: NewGame
  },
  {
    path: '/dark/wolf',
    component: Wolf
  }
];

export default routes;