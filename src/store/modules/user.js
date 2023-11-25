import { login } from '@/api/sys'
import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    /**
     * 登录请求动作
     */
    login(context, userInfo) {
      const { username, password } = userInfo
      // 为什么要return一个promise
      // 因为我们希望在登录之后，无论登录成功或失败，都能在组件里面进行对应的处理，所以我们希望return一个promise实例来去分别处理.then和.catch
      return new Promise((resolve, reject) => {
        login({
          username,
          // 使用md5加密
          password: md5(password)
        })
          .then((data) => {
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
