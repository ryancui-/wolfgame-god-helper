<template>
  <div class="main">
    <div>
      <mt-header :title="title"></mt-header>
    </div>

    <div class="tips">
      <span>（选择验人号码记录）</span>
    </div>

    <div>
      <num-picker :values="values" :show-camp="true"></num-picker>
    </div>

    <div class="btnPanel">
      <mt-button type="primary" @click.native="submit">确定</mt-button>
    </div>
  </div>
</template>

<script>
  import NumPicker from './NumPicker.vue';

  export default {
    data() {
      return {
        values: []
      }
    },
    methods: {
      submit() {
        let payload = {};
        payload.see = (+this.values === 0) ? null : +this.values;

        this.$store.commit('seerTurn', payload);

        this.$router.push('/night');
      }
    },
    components: {
      NumPicker
    },
    computed: {
      title() {
        return `第 ${this.$store.state.current} 天晚上`
      }
    }
  }
</script>

<style>
  .tips {
    font-family: "Microsoft YaHei UI";
    font-weight: bold;
    font-size: 13px;
    color: red;
  }
</style>