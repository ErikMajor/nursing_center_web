/**
 * getters 和 组件的 computed 类似，
 * 方便直接生成一些可以直接用的数据。
 * 当组装的数据要在多个页面使用时，
 * 就可以使用 getters 来做。
 */
//取state中的用户对象
export const user = state => state.user
//取计数
export const count = state => state.count

