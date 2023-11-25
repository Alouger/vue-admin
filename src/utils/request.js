import axios from 'axios'
import md5 from 'md5'
import { ElMessage } from 'element-plus'

const service = axios.create({
  // 实现在开发和生产环境下，可以设定不同baseUrl的能力
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const { icode, time } = getTestICode()
    config.headers.icode = icode
    config.headers.codeType = time
    // // 在这个位置需要统一的去注入token
    // if (store.getters.token) {
    //   // 如果token存在 注入token
    //   config.headers.Authorization = `Bearer ${store.getters.token}`
    //   if (isCheckTimeout()) {
    //     // 登出操作
    //     store.dispatch('user/logout')
    //     return Promise.reject(new Error('token 失效'))
    //   }
    // }
    // // 配置接口国际化
    // config.headers['Accept-Language'] = store.getters.language
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  // 请求成功的回调函数
  response => {
    const { success, message, data } = response.data
    console.log('response', response)
    console.log('response.data', response.data)
    // 此时response就是data.data.data.token中第一个data
    // 判断当前请求是否成功
    if (success) {
      // 成功返回解析后的数据
      return data
    } else {
      // 失败（请求成功，但业务失败），进行消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败（404,500）的回调函数
  error => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

/**
 * 返回 Icode 的实现
 */
function getTestICode() {
  const now = parseInt(Date.now() / 1000)
  const code = now + 'LGD_Sunday-1991-12-30'
  return {
    icode: md5(code),
    time: now
  }
}
export default service
