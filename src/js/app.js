
import Vue from 'vue/dist/vue.js';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.use(Mint);

let v = new Vue({
  el: '#app',
  data: {
    name: 'Jack',
    nickName: 'Mike'
  },
  methods: {
    getName() {
      alert(this.name)
    }
  }
})
