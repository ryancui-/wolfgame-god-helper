<template>

  <div>
    <mt-header fixed title="新的对局"></mt-header>

    <mt-range
      v-model="players"
      :min="8"
      :max="16"
      :step="1"
      :bar-height="5">
    </mt-range>
  </div>

</template>

<script>
//  import Vue from 'vue/dist/vue.js';
//  import Mint from 'mint-ui';

  import { Header, Range } from 'mint-ui';

//  Vue.use(Mint);

  export default {
    components: {
      Header, Range
    },
    data() {
      return {
        players: 12,
        wolfPlayers: 4,
      }
    },
    methods: {
      checkValid() {
        return true;
      }
    }
  };
</script>

<style>


</style>