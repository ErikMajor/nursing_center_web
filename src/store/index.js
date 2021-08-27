//每当store.state.count变化的时候,都会重新求取计算属性，并且触发更新相关联的 DOM。
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import * as getters from './getters'
import state from './state'
import mutations from './mutation'

Vue.use(Vuex)
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})