<template>
  <div class="main">
    <div>
      <mt-picker ref="numPicker" :slots="playerNumSlot" :showToolbar="true" :visibleItemCount="3" :itemHeight="30" @change="onNumChange">
        <div class="toolbar">
          <span>游戏人数</span>
          <span>狼</span>
          <span>神</span>
          <span>民</span>
        </div>
      </mt-picker>
    </div>

    <div>
      <mt-checklist
        title="神牌"
        :max="functionalNum"
        v-model="functional"
        :options="['女巫', '预言家', '猎人', '白痴', '守卫', '禁言长老', '诽谤者', '纵火者']">
      </mt-checklist>
    </div>
    <div>
      <mt-button type="primary" @click.native="set15Standard">12人标准局</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        functionalNum: 4,
        functional: [],
        playerNumSlot: [{
          flex: 1,
          values: [12, 13, 14, 15, 16],
        }, {
          divider: true,
          content: '-',
        }, {
          flex: 1,
          values: [4, 5],
        }, {
          divider: true,
          content: '-',
        }, {
          flex: 1,
          values: [4, 5, 6]
        }, {
          divider: true,
          content: '-',
        }, {
          flex: 1,
          values: [4, 5, 6]
        }]
      }
    },
    methods: {
      onNumChange (picker, values) {
        this.functionalNum = values[2];
      },
      /** 设定 15 人标准局 */
      set15Standard () {
        this.$refs.numPicker.setSlotValue(0, 15);
        this.$refs.numPicker.setSlotValue(1, 5);
        this.$refs.numPicker.setSlotValue(2, 5);
        this.$refs.numPicker.setSlotValue(3, 5);
      }
    }
  }
</script>

<style scoped>
  .main {
    padding-top: 40px;
  }
  .main > div {
    padding: 10px 10px;
  }

  .toolbar {
    display: flex;
    justify-content: space-around;
  }

  .toolbar > span {
    width: 100px;
    text-align: center;
  }
</style>