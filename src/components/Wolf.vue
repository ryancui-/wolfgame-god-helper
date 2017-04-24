<template>
  <div class="main">
    <div>
      <mt-header :title="title"></mt-header>
    </div>

    <div>
      <num-picker :values="values" :show-camp="true" :show-to-be-death="true"></num-picker>
    </div>

    <div class="btnPanel">
      <mt-button type="primary" @click.native="killSomeone">{{killBtnText}}</mt-button>
    </div>
  </div>
</template>

<script>
  import NumPicker from './NumPicker.vue';

  export default {
    data () {
      return {
        values: []
      }
    },
    methods: {
      killSomeone() {
        let payload = {};
        payload.kill = (+this.values === 0) ? null : +this.values;

        this.$store.commit('wolfTurn', payload);

        this.$router.push('/night');
      }
    },
    components: {
      NumPicker
    },
    computed: {
      title () {
        return `第 ${this.$store.state.current} 天晚上 - 狼人杀人`;
      },
      killBtnText() {
        return this.values.length === 0 ? '空刀' : `刀 ${+this.values} 号`;
      }
    }
  }
</script>

<style>

</style>