//mutations是store状态的更新唯一方式
import * as types from './mutation-types'

const mutations = {
    //设置用户
    [types.SET_USER](state,user){
        state.user = user
    },
    //计数+1
    [types.INCREMENT_COUNT](state,num){
        state.count += num
    }
}

export default mutations