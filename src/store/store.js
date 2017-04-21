/**
 * Created by ryancui on 2017/3/14.
 */
import createPersist, { createStorage } from 'vuex-localstorage'
import Vue from 'vue';
import FunctionType from './function-type.js';

/**
 * 游戏进程的死亡、毒玩家号码从 1 开始计数
 */
export default {
  state: {
    types: [],            // 特殊身份牌列表（包括狼人阵营与好人阵营）

    /** 游戏进程 */
    current: 1,           // 游戏进行到第几天
    progress: [],         // 数组，每天夜晚的操作集合

    /** 玩家信息 */
    totalPlayer: 12,
    players: null,        // 数组，每个对象是一名玩家
    functioner: {},       // 特殊身份牌

    /** 白天信息（每天会被覆盖） */
    dayInfo: {}
  },
  getters: {
    /**
     * 当天中刀号码
     */
    toBeDeath(state) {
      let status = state.progress[state.current - 1];
      return status && status.kill;
    }
  },
  mutations: {
    /**
     * 新游戏
     * p.totalNumber (Number) 游戏总人数
     * p.types (Array) 游戏角色牌名称数组
     */
    initNew(state, p) {
      let character = {
        camp: 1,                              // 阵营，0为中立，1为好人，-1为狼人
        type: FunctionType.VILLIAGER,         // 身份信息
        death: false,                         // 是否死亡
      };

      state.types = p.types;

      state.current = 1;
      state.progress = [{}];

      state.players = [];
      state.totalPlayer = p.totalPlayer;
      for (let i=0; i<p.totalPlayer; i++) {
        state.players.push(Object.assign({
          id: i+1
        }, character));
      }

      state.functioner = {};
      state.dayInfo = {};
    },
    /** 
     * 设置狼人阵营
     * p.wolf (Array) 狼人玩家号码数组
     */
    setWolf(state, p) {
      p.wolf.forEach(value => {
        state.players[value - 1].camp = -1;
        state.players[value - 1].type = FunctionType.WOLF;
      });
    },
    /**
     * 设置功能者
     * @param {*} p 
     * p.type (String) FunctionType 要设置的功能者
     * p.number (Number) 玩家号码
     */
    setFunction(state, p) {
      state.players[p.number - 1].type = p.type;

      state.functioner[p.type] = state.players[p.number - 1];
    },
    /** 
     * 狼人轮次 
     * p.kill (Number) 要刀的号码，空刀为null
     */
    wolfTurn(state, p) {
      let status = state.progress[state.current - 1];
      Vue.set(status, 'kill', p.kill);
    },
    /** 
     * 女巫轮次 
     * p.isSave (Boolean) 是否使用解药
     * p.poison (Number) 要毒的号码
     */
    witchTurn(state, p) {
      let status = state.progress[state.current - 1];
      Vue.set(status, 'isSave', p.isSave);
      Vue.set(status, 'poison', p.poison);
    },
    /** 
     * 预言家轮次 
     * p.see (Number) 验人号码
     */
    seerTurn(state, p) {
      let status = state.progress[state.current - 1];
      Vue.set(status, 'see', p.see);
    },
    /**
     * 白天的死亡事件
     * p.death (Array) 死亡号码
     */
    dieDuringDay(state, p) {
      let status = state.progress[state.current - 1];
      Vue.set(status, 'out', p);
      for (let i of p) {
        state.players[i - 1].death = true;
      }
    },
    /**
     * 执行白天逻辑
     * @param state
     */
    finishDay(state) {
      state.progress.push({});
      state.current++;
    },
    /**
     * 执行晚上逻辑，判断游戏是否结束，生成白天公布的信息
     */
    finishNight(state) {
      let status = state.progress[state.current - 1];
      
      // 重置白天信息
      state.dayInfo = {
        death: []
      };

      if (!status.isSave) {
        status.kill && state.dayInfo.death.push(status.kill);
        status.kill && (state.players[status.kill - 1].death = true);
      } else {
        // 已使用解药，设置标签
        Vue.set(state.functioner[FunctionType.WITCH], 'useGood', true);
      }

      if (status.poison) {
        if (status.poison !== status.kill) {
          state.dayInfo.death.push(status.poison);
          state.players[status.poison - 1].death = true;
        }
        
        // 已使用毒药，设置标签
        Vue.set(state.functioner[FunctionType.WITCH], 'useBad', true);
      }
    },
    // test (state) {
    //   state.players[0].camp = -1;
    // }
  },
  plugins: [createPersist({
    namespace: 'namespace-for-state',
    initialState: {},
    // ONE_WEEK
    expires: 7 * 24 * 60 * 60 * 1e3
  })]
};