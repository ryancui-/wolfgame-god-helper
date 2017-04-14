<template>
  <div class="main">

    <div v-for="item in sortedTypes" class="btnPanel">
      <mt-button type="primary" @click.native="redirect(item.url)">{{item.text}}</mt-button>
    </div>

    <div class="btnPanel">
      <mt-button type="primary" @click.native="finish">天亮了</mt-button>
    </div>
  </div>
</template>

<script>
  import FunctionType from '../store/function-type';
  /**
   * 根据types按顺序生成睁眼顺序
   */
  export default {
    data() {
      return {

      }
    },
    methods: {
      /**
       * 重定向到各角色
       * @param url
       */
      redirect(url) {
        if (this.$store.state.current === 1) {
          this.$router.push('/select/' + url);
        } else {
          this.$router.push('/' + url);
        }
      },
      /**
       * 夜晚流程结束，进入天亮
       */
      finish() {
        this.$store.commit('finishNight');

        this.$router.push('/day');
      }
    },
    computed: {
      sortedTypes () {
        let result = [];
        const types = this.$store.state.types;

        // TODO 有守卫，守卫睁眼

        // 狼人睁眼
        result.push({
          url: 'wolf',
          text: '狼人请睁眼',
        });

        // 女巫睁眼
        if (types.indexOf(FunctionType.WITCH) !== -1) {
          result.push({
            url: 'witch',
            text: '女巫请睁眼',
          });
        }

        // 预言家睁眼
        if (types.indexOf(FunctionType.SEER) !== -1) {
          result.push({
            url: 'seer',
            text: '预言家请睁眼',
          });
        }

        // 猎人睁眼
        if (types.indexOf(FunctionType.GUN) !== -1) {
          result.push({
            url: 'gun',
            text: '猎人请睁眼',
          });
        }

        // 白痴睁眼
        if (types.indexOf(FunctionType.IDIOT) !== -1) {
          result.push({
            url: 'idiot',
            text: '白痴请睁眼',
            disabled: this.$store.state.current !== 1
          });
        }

        return result;
      }
    }
  }
</script>

<style>
</style>