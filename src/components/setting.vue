<template>
  <div class="main">
    <div class="btnPanel">
      <mt-button type="primary" @click.native="showPredefine">预设</mt-button>
    </div>

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
        title="狼牌"
        :max="wolfPlayer"
        v-model="wolf"
        :options="['白狼王', '狼美人', '纵火者']">
      </mt-checklist>
    </div>

    <div>
      <mt-checklist
        title="神牌"
        :max="functionalPlayer"
        v-model="functional"
        :options="['女巫', '预言家', '猎人', '白痴', '守卫', '禁言长老', '潜行者', '诽谤者']">
      </mt-checklist>
    </div>

    <div class="btnPanel">
      <mt-button type="primary" @click.native="start">开始</mt-button>
    </div>

    <mt-actionsheet
      :actions="preDefine"
      v-model="showPredefineAction">
    </mt-actionsheet>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        totalPlayer: 12,
        wolfPlayer: 4,
        functionalPlayer: 4,
        normalPlayer: 4,
        wolf: [],
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
        }],
        showPredefineAction: false,
        preDefine: [{
          name: '12人预女猎白',
          method () {

          }
        }, {
          name: '12人预女猎守+白狼'
        }, {
          name: '12人预女禁潜+狼美人'
        }]
      }
    },
    methods: {
      onNumChange (picker, values) {
        this.totalPlayer = values[0];
        this.wolfPlayer = values[1];
        this.functionalPlayer = values[2];
        this.normalPlayer = values[3];
      },
      showPredefine () {
        this.showPredefineAction = true;
      },
      /** 设定 15 人标准局 */
      set15Standard () {
        this.$refs.numPicker.setSlotValue(0, 15);
        this.$refs.numPicker.setSlotValue(1, 5);
        this.$refs.numPicker.setSlotValue(2, 5);
        this.$refs.numPicker.setSlotValue(3, 5);
      },
      /** 开始游戏 */
      start () {
        // TODO 合法性检验

        // 初始化游戏数据
        let payload = {
          totalPlayer: this.totalPlayer,
          wolfPlayer: this.wolfPlayer,
          functionalPlayer: this.functionalPlayer,
          normalPlayer: this.normalPlayer,
          wolf: this.wolf,
          functional: this.functional
        };

        this.$store.commit('initNew', payload);

        // 跳转到夜晚
        this.$router.push('/dark/wolf');
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

  .btnPanel {
    display: flex;
  }

  .btnPanel > * {
    flex-grow: 1;
  }
</style>