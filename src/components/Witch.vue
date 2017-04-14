<template>
  <div class="main">
    <div>
      <mt-header :title="title"></mt-header>
    </div>

    <div>
      <span>女巫轮次：</span>
    </div>

    <div>
      <num-picker :max-num="$store.state.totalPlayer" :values="values" :show-to-be-death="!useGood" :disable-selection="useBad"></num-picker>
    </div>

    <div class="btnPanel">
      <mt-button type="primary" @click.native="submit(true)" :disabled="useGood">救，{{poisonText}}</mt-button>
      <mt-button type="primary" @click.native="submit(false)">不救，{{poisonText}}</mt-button>
    </div>
  </div>
</template>

<script>
  import FunctionType from '../store/function-type.js';
  import NumPicker from './NumPicker.vue';

  export default {
    data() {
      return {
        values: []
      }
    },
    methods: {
      submit(isSave) {
        let payload = {};
        payload.isSave = isSave;
        payload.poison = (+this.values === 0) ? null : +this.values;

        this.$store.commit('witchTurn', payload);

        this.$router.push('/night');
      }
    },
    components: {
      NumPicker
    },
    computed: {
      title() {
        return `第 ${this.$store.state.current} 天晚上 - 女巫请睁眼`
      },
      useGood() {
        return !!this.$store.state.functioner[FunctionType.WITCH].useGood;
      },
      useBad() {
        return !!this.$store.state.functioner[FunctionType.WITCH].useBad;
      },
      poisonText() {
        return this.values.length === 0 ? '不毒' : `毒 ${+this.values} 号`;
      }
    }
  }
</script>

<style>

</style>