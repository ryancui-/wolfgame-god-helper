<template>
  <div class="info-box">
    <ul>
      <li v-for="text in content">
        {{text}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      content: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style>
</style>