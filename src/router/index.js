import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 公开路由表
 * 把routes改名为publicRoutes
 */
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
