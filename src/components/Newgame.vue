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
        title="功能牌"
        v-model="types"
        :options="functioner">
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
  import FunctionType from '../store/function-type.js';

  export default {
    data () {
      return {
        totalPlayer: 12,
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
          method: this.set12Standard
        }, {
          name: '12人预女猎守+白狼'
        }, {
          name: '12人预女禁潜+狼美人'
        }],
        types: []
      }
    },
    methods: {
      onNumChange(picker, values) {
        this.totalPlayer = values[0];
      },
      showPredefine() {
        this.showPredefineAction = true;
      },
      set12Standard() {
        this.$refs.numPicker.setSlotValue(0, 12);
        this.$refs.numPicker.setSlotValue(1, 4);
        this.$refs.numPicker.setSlotValue(2, 4);
        this.$refs.numPicker.setSlotValue(3, 4);

        this.types = [FunctionType.SEER, FunctionType.WITCH, FunctionType.GUN, FunctionType.IDIOT];
      },
      /** 开始游戏 */
      start() {
        // TODO 合法性检验

        // 初始化游戏数据
        let payload = {
          totalPlayer: this.totalPlayer,
          types: this.types
        };

        this.$store.commit('initNew', payload);

        // 跳转到狼人的选择
        this.$router.push('/night');
      }
    },
    computed: {
      functioner() {
        let result = [];

        for (let i in FunctionType) {
          // 忽略普通狼人和普通村民
          // TODO 完善其他板子的逻辑再放出选项
          if (i === 'WOLF' || i === 'VILLIAGER') {
            continue;
          }

          // FIXME 暂时只放出预女猎白版子
          if (['SEER', 'WITCH', 'GUN', 'IDIOT'].indexOf(i) !== -1) {
            result.push(FunctionType[i]);
          }
        }

        return result;
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