//Action可以包含任意异步操作中,不进行状态的直接更改，而是通过commit触发mutation
import * as types from './mutation-types'
//保存用户
export const setUser = function({commit},user){
    console.log(user)
    commit(types.SET_USER,user)
}
//更新计数
export const setCount = function ({commit},num) {
    commit(types.INCREMENT_COUNT,num)
}
