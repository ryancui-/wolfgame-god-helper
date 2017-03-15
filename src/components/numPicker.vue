<template>
  <div class="top">
    <div class="row" v-for="r in 4">
      <span class="item" :class="status[i-1]" @click="changeStatus(i-1)" v-for="i in [4*r-3, 4*r-2, 4*r-1, 4*r]">
        <span>{{i}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // 状态类
        status: []
      }
    },
    created () {
      let one = {
        'item-normal': true,
        'item-wolf': false,
        'item-good': false,
        'item-bad': false,
        'item-death': false,
        'item-dying': false,
        'item-guard': false,
        'item-poison': false,
        'item-select': false
      };

      for (let i=0; i<16; i++) {
        this.status.push(Object.assign({}, one));
      }
    },
    methods: {
      changeStatus (index) {
        this.status[index]['item-select'] = !this.status[index]['item-select'];
        this.status[index]['item-normal'] = !this.status[index]['item-normal'];
      }
    }
  }
</script>

<style>
  .row {
    display: flex;
    justify-content: space-around;
    padding-bottom: 3vw;
  }
  .item {
    width: 15vw;
    height: 15vw;
    font-size: 8vw;
    text-align: center;
    color: black;
  }

  .item-normal {
    background-color: #8abe6c;
  }

  .item-select {
    background-color: red;
  }

  .item > span {
    vertical-align: middle;
  }
</style>