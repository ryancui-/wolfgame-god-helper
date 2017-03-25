/**
 * Created by ryancui on 2017/1/19.
 */

import Newgame from './components/Newgame.vue';
import TypeSelect from './components/TypeSelect.vue';
import Wolf from './components/wolf.vue';


const routes = [{
  path: '/',
  component: Newgame
}, {
  path: '/select/:type',
  component: TypeSelect
}, {
  path: '/wolf',
  component: Wolf
}];

export default routes;