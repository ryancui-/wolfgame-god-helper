<template>
  <div class="top">
    <div class="row" v-for="r in 4" v-if="(r-1)*4 < maxNum">
    <span class="item" :class="status[i-1]" v-for="i in [4*r-3, 4*r-2, 4*r-1, 4*r]"
          @touchstart="onTouchStart(i-1, $event)" @touchmove="onTouchMove($event)" @touchend="onTouchEnd($event)"
          :style="visible[i-1]">
      <span>{{i}}</span>
    </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      values: {
        type: Array,
        required: true
      },
      multiple: Boolean,
      showCamp: Boolean,
      showToBeDeath: Boolean,
      disableSelection: Boolean
    },
    data() {
      return {
        selection: [],  // 状态类
        prevTouch: 0,
        maxNum: this.$store.state.totalCount
      }
    },
    created() {
      let one = {
        'item-select': false
      };

      for (let i = 0; i < 16; i++) {
        this.selection.push(Object.assign({}, one));
      }
    },
    methods: {
      /**
       * 点击 Cell 回调
       * @param index 被点击的号码
       */
      onTouchStart (index, evt) {
        // 禁止选择
        if (this.disableSelection) {
          this.prevTouch = null;
          return;
        }

        // 当前选择index已死亡
        if (this.$store.state.players[index] && this.$store.state.players[index].death) {
          this.prevTouch = null;
          return;
        }

        this.prevTouch = index;
//        console.log(evt);
      },
      onTouchMove (evt) {
        let target = document.elementFromPoint(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY);
//        console.log(target);
      },
      onTouchEnd (evt) {
//        console.log(evt);

        let index = this.prevTouch;

        if (index !== null) {
          this.selection[index]['item-select'] = !this.selection[index]['item-select'];

          if (!this.multiple) {
            for (let i=0; i<16; i++) {
              if (i === index) {
                continue;
              }
              this.selection[i]['item-select'] = false;
            }
          }

          this.values.splice(0);
          for (let i=0; i<16; i++) {
            if (this.selection[i]['item-select']) {
              this.values.push(i + 1);
            }
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
      },
      status () {
        let status = JSON.parse(JSON.stringify(this.selection));

        // 显示是否已经死亡
        for (let i=0; i<16; i++) {
          status[i]['item-death'] = (this.$store.state.players[i] && this.$store.state.players[i].death);
        }

        // 是否显示阵营
        if (this.showCamp) {
          for (let i=0; i<16; i++) {
            status[i]['item-wolf'] = (this.$store.state.players[i] && this.$store.state.players[i].camp < 0);
          }
        }

        // 显示当天中刀号码
        if (this.showToBeDeath) {
          let toBeDeath = this.$store.getters.toBeDeath;
          if (toBeDeath) {
            status[toBeDeath - 1]['item-tobedeath'] = true;
          }
        }

        return status;
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

  .item-tobedeath {
    background-color: greenyellow;
  }

  .item-death {
    background-color: #af264b;
  }

  .item > span {
    vertical-align: middle;
  }

  .canvas {
    position: absolute;
    top: 0px;
  }
</style>