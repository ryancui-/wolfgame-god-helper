<template>
  <div class="main">
    <div>
      <mt-header :title="title"></mt-header>
    </div>

    <div>
      <num-picker></num-picker>
    </div>
  </div>
</template>

<script>
  import NumPicker from './numPicker.vue';

  export default {
    data () {
      return {

      }
    },
    components: {
      NumPicker
    },
    computed: {
      title () {
        return `第 ${this.$store.state.current} 天晚上`;
      }
    }
  }
</script>

<style>
  .main {
    padding-top: 40px;
  }
  .main > div {
    padding: 10px 10px;
  }
</style>