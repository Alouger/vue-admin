// import variables from '@/styles/variables.module.scss'
import { MAIN_COLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'

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
  cssVar: state => {
    return {
      // ...variables,
      ...state.theme.variables,
      ...generateColors(getItem(MAIN_COLOR))
    }
  },
  sidebarOpened: state => state.app.sidebarOpened,
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor,
  tagsViewList: state => state.app.tagsViewList
}
export default getters
