<template>
  <div class="main">
    <div>
      <mt-header :title="title"></mt-header>
    </div>

    <num-picker :values="select" :multiple="multiple"></num-picker>

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
  import { Toast } from 'mint-ui';

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

        for (let i = 0; i < this.select.length; i++) {
          if (this.$store.state.players[this.select[i] - 1].type !== '') {
            Toast({
              message: `错误：${this.select[i]} 号身份已经设置为${this.$store.state.players[this.select[i] - 1].type}`,
              duration: 1000
            });
            return;
          }
        }

        // 选择狼人
        if (this.multiple) {
          if (this.select.length !== this.$store.state.wolfCount) {
            Toast({
              message: `错误：狼人数目应为 ${this.$store.state.wolfCount}`,
              duration: 1000
            });
            return;
          }

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