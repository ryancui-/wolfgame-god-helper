<template>

  <div>
    <router-link to="/setting"><mt-button type="primary" class="btn">新的一局</mt-button></router-link>
  </div>

</template>

<script>
  export default {
    data() {
      return {};
    }
  };
</script>

<style scoped>
  div {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  a {
    width: 80%;
  }

  .btn {
    width: 100%;
  }
</style>