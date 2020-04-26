import Vue from 'vue'
const api = require('electron').remote.require('./api').default

const state = {
  /**
   * 账号列表
   * @property pinId
   * @property name
   * @property cookie
   * @property isLogin
   * @property isPlusMember
   */
  account: {}
}
const getters = {
  accountList: state => {
    let result = []
    for (const key in state.account) {
      if (state.account.hasOwnProperty(key)) {
        result.push(state.account[key])
      }
    }
    return result
  }
}
const mutations = {
  SAVE_OR_UPDATE (state, { pinId, name, cookie, isLogin, isPlusMember }) {
    let params = {pinId, name, cookie, isLogin, isPlusMember}
    if (!name) {
      params.name = state.account[pinId].name
    }
    if (!cookie) {
      params.cookie = state.account[pinId].cookie
    }
    if (isLogin === undefined) {
      params.isLogin = state.account[pinId].isLogin
    }
    if (isPlusMember === undefined) {
      params.isPlusMember = state.account[pinId].isPlusMember
    }
    Vue.set(state.account, pinId, params)
  },
  REMOVE (state, pinId) {
    Vue.delete(state.account, pinId)
  },
  CLEAR_ALL (state) {
    state.account = {}
  }
}

const actions = {
  /**
   * 保存账号
   * @param commit
   * @param cookie
   * @returns {Promise<void>}
   */
  async saveAccount ({ commit }, cookie) {
    const pinId = cookie.match(/pinId=(.*?);/)[1]
    const name = window.decodeURIComponent(cookie.match(/unick=(.*?);/)[1])
    let res = {isLogin: false, isPlusMember: false}
    try {
      res = await api.jd.cookieCheck(cookie)
    } finally {
      commit('SAVE_OR_UPDATE', { pinId, name, cookie, isLogin: res.isLogin, isPlusMember: res.isPlusMember })
    }
  },
  /**
   * 检查state里边所有账号有效性
   * @param state
   * @param commit
   * @returns {Promise<void>}
   */
  async checkAccountList ({ state, commit }) {
    for (const key in state.account) {
      if (state.account.hasOwnProperty(key)) {
        const cookie = state.account[key].cookie
        let res = {isLogin: false, isPlusMember: false}
        try {
          res = await api.jd.cookieCheck(cookie)
        } finally {
          commit('SAVE_OR_UPDATE', { pinId: key, isLogin: res.isLogin, isPlusMember: res.isPlusMember })
        }
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
