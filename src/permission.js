import router from './router'
import store from '@/store'

// 白名单：用户没有任何权限的时候也可以进入的页面
const whiteList = ['/login']

/**
 * 路由前置守卫
 * @param {*} to 要跳转到哪个路由去
 * @param {*} from 从哪个路由来
 * @param {*} next 是否要跳转？
 */
router.beforeEach(async (to, from, next) => {
  // if (store.state.user.token)
  console.log(store.getters.token)
  // 快捷访问
  if (store.getters.token) {
    // 1. 用户已登录的话(通过token判断)，则不允许进入login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的action
        await store.dispatch('user/getUserInfo')
      }
      // 允许进入其他页面，next()不传入参数
      next()
    }
  } else {
    // 2. 用户未登录，只允许进入login
    if (whiteList.indexOf(to.path) > -1) {
      // 要跳转的页面在白名单里，进行跳转
      next()
    } else {
      next('/login')
    }
  }
})
