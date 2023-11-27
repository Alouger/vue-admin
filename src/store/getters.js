import variables from '@/styles/variables.module.scss'

// 快捷访问
const getters = {
  token: (state) => state.user.token,
  userInfo: state => state.user.userInfo,
  /**
   * @returns true表示已存在用户信息
   */
  hasUserInfo: state => {
    // 因为我们的userInfo的初始值是一个对象（{}），不能直接用!state.user.userInfo或state.user.userInfo这种方式来判断是否存在，
    // 如果是这种方式并且state.user.userInfo等于初始值{}的话!state.user.userInfo得到的结果是false, state.user.userInfo得到的结果为true
    // 而是转成JSON字符串来看不是空对象
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: state => variables,
  sidebarOpened: state => state.app.sidebarOpened
}
export default getters
