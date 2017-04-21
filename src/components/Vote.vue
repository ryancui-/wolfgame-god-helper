<template>
  <div class="main">
    <div>
      <mt-header :title="title"></mt-header>
    </div>

    <num-picker :max-num="$store.state.totalPlayer" :values="select" :multiple="true">
    </num-picker>

    <div>
      <label for="">选择为：</label>
      <span>{{selectLabel}}</span>
    </div>

    <div class="btnPanel">
      <mt-button type="primary" @click.native="submit">确定</mt-button>
    </div>
  </div>
</template>

<script>
  import NumPicker from './NumPicker.vue';

  export default {
    data () {
      return {
        select: []
      };
    },
    methods: {
      submit () {
        this.$store.commit('dieDuringDay', this.select);
        this.$router.push('/day');
      }
    },
    components: {
      NumPicker: NumPicker
    },
    computed: {
      title () {
        return `选择第 ${this.$store.state.current} 天白天死亡玩家`;
      },
      selectLabel () {
        return this.select.join(',');
      }
    }
  };

</script>

<style>
</style>