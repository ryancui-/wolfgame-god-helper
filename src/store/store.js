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

    wolf: [],
    functional: [],

    /** 身份牌 */
    wolf: [],
    whiteWolf: null,
    witch: null,
    seer: null,
    gun: null,
    idiot: null,
    savior: null,

    /** 游戏进程 */
    current: 1,
    progress: []
  },
  mutations: {
    initNew(state, payload) {
      state.totalPlayer = payload.totalPlayer;
      state.wolfPlayer = payload.wolfPlayer;
      state.functionalPlayer = payload.functionalPlayer;
      state.normalPlayer = payload.normalPlayer;

      state.wolf = payload.wolf;
      state.functional = payload.functional;

      state.current = 1;
    }
  }
};