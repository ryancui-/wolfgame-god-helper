<template>
  <div class="top">
    <div class="row" v-for="r in 4" v-if="(r-1)*4 < maxNum">
      <span class="item" :class="status[i-1]" @click="changeStatus(i-1)" v-for="i in [4*r-3, 4*r-2, 4*r-1, 4*r]"
            :style="visible[i-1]">
        <span>{{i}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      maxNum: Number,
      values: {
        type: Array,
        required: true
      },
      multiple: Boolean
    },
    data () {
      return {
        // 状态类
        status: []
      }
    },
    created () {
      let one = {
        'item-select': false
      };

      for (let i=0; i<16; i++) {
        this.status.push(Object.assign({
          'item-wolf': this.$store.state.players[i] && this.$store.state.players[i].camp < 0
        }, one));
      }
    },
    methods: {
      changeStatus (index) {
        if (this.multiple) {
          this.status[index]['item-select'] = !this.status[index]['item-select'];
        } else {
          for (let i=0; i<16; i++) {
            this.status[i]['item-select'] = false;
          }
          this.status[index]['item-select'] = true;
        }

        this.values.splice(0);
        for (let i=0; i<16; i++) {
          if (this.status[i]['item-select']) {
            this.values.push(i + 1);
          }
        }
      }
    },
    computed: {
      visible() {
        let visibleArray = [];

        for (let i=1; i<=16; i++) {
          let visible = {
            visibility: (i <= this.maxNum) ? 'visible' : 'hidden'
          };

          visibleArray.push(visible);
        }

        return visibleArray;
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
    font-size: 9vw;
    text-align: center;
    color: black;
    border: 2px solid black;
    border-radius: 4vw;
    font-family: "Microsoft YaHei";
  }

  .item-select {
    /*background-color: #ffa57d;*/
    font-size: 9vw;
    font-weight: bold;
    color: red;
    border-color: red;
  }

  .item-wolf {
    background-color: #eeb012;
  }

  .item > span {
    vertical-align: middle;
  }


</style>