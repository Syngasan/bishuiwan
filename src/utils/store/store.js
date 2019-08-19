import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {},
    imgInfo: null,
    taskNumber:0,
    messageNumber:0,
    snatchTaskNumber:0,
    totalTaskNumber:0,
  },
  mutations: {
    getInfo(state, payload) {
      state.info = payload
      console.log(state.info, '0000');

    },
    // export const SETIMGINFO = 'SETIMGINFO'
    SETIMGINFO(state, info) {
      state.imgInfo = info
      localStorage.setItem('head', info)
    }
  }
})
