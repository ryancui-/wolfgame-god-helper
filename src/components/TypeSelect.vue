<template>
  <div class="main">
    <div>
      <mt-header :title="title"></mt-header>
    </div>

    <num-picker :max-num="$store.state.totalPlayer" :values="select" :multiple="multiple">
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
  import FunctionType from '../store/function-type.js';

  export default {
    components: {
      NumPicker
    },
    data() {
      return {
        select: []
      };
    },
    methods: {
      submit () {
        let payload = {};

        // 选择狼人
        if (this.multiple) {
          payload.wolf = this.select;
          this.$store.commit('setWolf', payload);
        } else {
          // 选择功能者
          payload.type = FunctionType[this.$route.params.type.toUpperCase()];
          payload.number = +this.select;
          this.$store.commit('setFunction', payload);
        }

        this.$router.push('/' + this.$route.params.type);
      }
    },
    computed: {
      title () {
        return `请选择${FunctionType[this.$route.params.type.toUpperCase()]}`;
      },
      multiple () {
        return (this.$route.params.type.toUpperCase() === 'WOLF');
      },
      selectLabel () {
        return this.select.join(',');
      }
    }
  }
</script>

<style>
</style>