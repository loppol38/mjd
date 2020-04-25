import Vue from 'vue'
import api from '../../api'

const state = {
  /**
   * 账号列表
   * @property pinId
   * @property name
   * @property cookie
   * @property isLogin
   */
  account: {}
}

const mutations = {
  SAVE_OR_UPDATE (state, { pinId, name, cookie, isLogin }) {
    let params = {name, cookie, isLogin}
    if (!name) {
      params.name = state.account[pinId].name
    }
    if (!cookie) {
      params.cookie = state.account[pinId].cookie
    }
    if (isLogin === undefined) {
      params.isLogin = state.account[pinId].isLogin
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
    commit('SAVE_OR_UPDATE', { pinId, name, cookie, isLogin: true })
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
        let isLogin = false
        try {
          isLogin = await api.jd.loginCheck(cookie)
        } finally {
          commit('SAVE_OR_UPDATE', { pinId: key, isLogin })
        }
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
