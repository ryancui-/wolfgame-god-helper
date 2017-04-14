/**
 * Created by ryancui on 2017/1/19.
 */

import Newgame from './components/Newgame.vue';
import TypeSelect from './components/TypeSelect.vue';
import Wolf from './components/Wolf.vue';
import Witch from './components/Witch.vue';
import Seer from './components/Seer.vue';
import Night from './components/Night.vue';
import Day from './components/Day.vue';

const routes = [{
  path: '/',
  component: Newgame
}, {
  path: '/day',
  component: Day
}, {
  path: '/night',
  component: Night
}, {
  path: '/select/:type',
  component: TypeSelect
}, {
  path: '/wolf',
  component: Wolf
}, {
  path: '/witch',
  component: Witch
}, {
  path: '/seer',
  component: Seer
}, {
  path: '/gun',
  redirect: '/night'
}, {
  path: '/idiot',
  redirect: '/night'
}];

export default routes;