<template>
  <div id="page" @touchmove.prevent>
    <mt-header fixed title="狼人杀助手">
      <router-link to="/" slot="left" v-show="showNewBtn">
        <mt-button>新游戏</mt-button>
      </router-link>
    </mt-header>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    computed: {
      showNewBtn () {
        return this.$route.path !== '/';
      }
    }
  }
</script>

<style scoped>
  #page {
    height: 100%;
  }
</style>