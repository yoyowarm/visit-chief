import Vue from 'vue'
import Vuex from 'vuex'
import { getMaps } from '../api/map'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map: null
  },
  mutations: {
    SET_MAPS(state, data) {
      state.map = data
    }
  },
  actions: {
    async getMap({ commit }, { county, town }) {
      const data = await getMaps(county, town)
      commit('SET_MAPS', data.data)
    }
  },
  modules: {
  }
})
