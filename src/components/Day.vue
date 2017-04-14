<template>
  <div class="main">
    <div>
      <mt-header :title="title"></mt-header>
    </div>

    <div>
      {{givenInfo}}
    </div>

    <div>
      <num-picker :max-num="$store.state.totalPlayer" :values="values"></num-picker>
    </div>

    <div class="btnPanel">
      <mt-button type="primary" @click.native="finishDay">天黑了</mt-button>
    </div>
  </div>
</template>

<script>
  import NumPicker from './NumPicker.vue';

  export default {
    components: {
      NumPicker
    },
    data() {
      return {
        values: []
      };
    },
    methods: {
      finishDay () {
        this.$store.commit('finishDay');

        this.$router.push('/night');
      }
    },
    computed: {
      title() {
        return `第 ${this.$store.state.current} 天白天`;
      },
      givenInfo() {
        return this.$store.state.dayInfo.death.length === 0 ? '平安夜' :
          `死亡的玩家是 ${this.$store.state.dayInfo.death.join(',')}`;
      }
    }
  }
</script>

<style>
</style>