// import path from 'path'
import path from 'path-browserify'

/**
 * 返回所有子路由
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级，比如/user/manage在一级路由有出现，但它又出现在/user的children里，所以要把它的一级路由给剔除掉
 */
export const filterRoutes = routes => {
  // 获取所有的子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子集路由进行查重操作
  return routes.filter(route => {
    // 根据route在childrenRoutes中进行查重，把所有重复路由表剔除
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 根据routes数据（是已经被filterRoutes函数过滤过后的，不包含重复数据），返回对应menu规则数组
 */
export function generateMenus(routes, basePath = '') {
  const result = []
  // 遍历路由表
  // 不满足条件 meta && meta.title && meta.icon 的数据不应该存在
  routes.forEach(item => {
    // 不存在 children 并且 不存在meta的我们直接return掉
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在 children，不存在meta，则迭代generateMenus
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在children，存在meta || 存在children && 存在meta
    // 因为最终的menu需要进行跳转，此时我们需要合并path
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，可能存在同名父路由的情况
    // 如果item.path恒等于routePath的话，说明当前路由已经被加入到result里了，则不需要重加
    let route = result.find(item => item.path === routePath)
    // 当前路由尚未加入到result的话
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成route对象，放入arr
        result.push(route)
      }
    }

    // 存在children && 存在meta
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
