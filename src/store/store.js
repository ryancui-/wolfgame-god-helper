/**
 * Created by ryancui on 2017/3/14.
 */
export default {
  state: {
    /** 人数 */
    totalPlayer: 12,
    wolfPlayer: 4,
    functionalPlayer: 4,
    normalPlayer: 4,

    /** 特殊身份牌列表 */
    wolf: [],
    functional: [],

    /** 身份牌对应号码 */
    wolf: [],
    whiteWolf: null,
    witch: null,
    seer: null,
    gun: null,
    idiot: null,
    savior: null,

    /** 游戏进程 */
    current: 1,
    progress: null
  },
  getters: {
    /** 公布白天信息 */
    dayInfo(state) {

    }
  },
  mutations: {
    /** 新游戏 */
    initNew(state, payload) {
      state.totalPlayer = payload.totalPlayer;
      state.wolfPlayer = payload.wolfPlayer;
      state.functionalPlayer = payload.functionalPlayer;
      state.normalPlayer = payload.normalPlayer;

      state.wolf = payload.wolf;
      state.functional = payload.functional;

      state.current = 1;
      state.progress = [{
        kill: null,
        isSave: false,
        poison: null,
        see: null
      }];

      state.wolf = [];
      state.whiteWolf = null;
      state.witch = null;
      state.seer = null;
      state.gun = null;
      state.idiot = null;
      state.savior = null;
    },
    /** 设置角色牌 */
    setWolf(state, p) {
      state[p.character] = p.player;
    },
    /** 狼人轮次 */
    wolfTurn(state, p) {
      let status = progress[state.current - 1];
      if (!status.kill) {
        status.kill = p.kill;
      }
    },
    /** 女巫轮次 */
    witchTurn(state, p) {
      let status = progress[state.current - 1];
      if (!status.isSave && !status.poison) {
        status.isSave = p.isSave;
        status.poison = p.poison;
      }
    },
    /** 预言家轮次 */
    seerTurn(state, p) {
      let status = progress[state.current - 1];
      if (!status.see) {
        status.poison = p.poison;
      }
    }
  }
};