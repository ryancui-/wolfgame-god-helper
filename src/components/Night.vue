<template>
  <div class="main">
    <info-box :content="infoContext"></info-box>

    <div v-for="(item, index) in sortedTypes" class="btnPanel">
      <mt-button type="primary" @click.native="redirect(item.url)">{{(index+1) + '. ' + item.text}}</mt-button>
    </div>

    <div class="btnPanel">
      <mt-button type="primary" @click.native="finish">天亮了</mt-button>
    </div>
  </div>
</template>

<script>
  import InfoBox from './InfoBox.vue';
  import FunctionType from '../store/function-type';
  /**
   * 根据types按顺序生成睁眼顺序
   */
  export default {
    components: {
      InfoBox
    },
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
        // 判断该身份是否已经选择完毕
        let hasSelect = false;
        if (url.toUpperCase() === 'WOLF') {
          for (let i = 0; i < this.$store.state.players.length; i++) {
            if (this.$store.state.players[i].type === FunctionType.WOLF) {
              hasSelect = true;
              break;
            }
          }
        } else {
          let key = FunctionType[url.toUpperCase()];
          if (this.$store.state.functioner[key] && this.$store.state.functioner[key].id) {
            hasSelect = true;
          }
        }

        if (!hasSelect) {
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
      },
      /**
       * 生成夜晚信息文本
       */
      infoContext () {
        let textArray = [];
        let nightInfo = this.$store.getters.currentProgress;

        if (nightInfo.kill !== undefined && nightInfo.kill !== null) {
          textArray.push(`当晚中刀号码：${this.$store.getters.toBeDeath} 号`);
        } else if (nightInfo.kill === null) {
          textArray.push(`当晚空刀`);
        }

        if (nightInfo.isSave) {
          textArray.push(`女巫使用解药`);
        }

        if (nightInfo.poison) {
          textArray.push(`女巫使用毒药：${nightInfo.poison} 号`);
        }

        if (nightInfo.see) {
          textArray.push(`预言家验人号码：${nightInfo.see} 号，该玩家身份为
            ${this.$store.state.players[nightInfo.see - 1].camp > 0 ? '好人' : '狼人'}`);
        }

        return textArray;
      }
    }
  }
</script>

<style>
</style>