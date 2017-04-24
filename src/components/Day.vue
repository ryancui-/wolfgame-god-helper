<template>
  <div class="main">
    <div>
      <mt-header :title="title"></mt-header>
    </div>

    <info-box :content="givenInfo"></info-box>

    <div class="btnPanel">
      <mt-button type="primary" @click.native="vote">放逐投票/狼人自爆</mt-button>
    </div>
    <div class="btnPanel">
      <mt-button type="primary" @click.native="finishDay">天黑了</mt-button>
    </div>
  </div>
</template>

<script>
  import InfoBox from './InfoBox.vue';
  import NumPicker from './NumPicker.vue';

  export default {
    components: {
      NumPicker, InfoBox
    },
    data() {
      return {
      };
    },
    methods: {
      vote() {
        this.$router.push('/vote');
      },
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
        let info = [];

        info.push(this.$store.state.dayInfo.death.length === 0 ? '平安夜' :
          `死亡的玩家是 ${this.$store.state.dayInfo.death.join(',')} 号`);

        if (this.$store.getters.currentProgress.out) {
          info.push(`白天死亡的玩家为 ${this.$store.getters.currentProgress.out.join(',')} 号`);
        }

        return info;
      }
    }
  }
</script>

<style>
</style>