import { login } from '@/api/sys'
import md5 from 'md5'
import { getItem, setItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    // 如果获取不到TOKEN才指定一个空字符串，否则只指定为空字符串的话，自动登录的需求无法实现
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
      // 把token保存到localStorage
      setItem(TOKEN, token)
    }
  },
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
            console.log(data)
            this.commit('user/setToken', data.token)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
