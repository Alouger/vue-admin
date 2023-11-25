import { createStore } from 'vuex'
import user from './modules/user'
import getters from './getters'

export default createStore({
  // 我们把这个getters注册为vuex的getters
  getters,
  modules: {
    user
  }
})
