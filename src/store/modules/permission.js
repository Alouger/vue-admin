import { routes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    // 路由表：初始拥有静态路由权限
    permissionRoutes: routes
  },
  mutations: {
    /**
     * 增加路由
     */
    setRoutes(state, newRoutes) {
      // 永远在静态路由的基础上增加新路由
      state.permissionRoutes = [...routes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     */
    filterRoutes(context, menus) {
      const routes = []
      // 路由权限匹配
      menus.forEach(key => {
        // 权限名 与 路由的name匹配
        routes.push(...privateRoutes.filter(item => {
          return item.name === key
        }))
      })
      // 最后添加 不匹配路由进入404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
