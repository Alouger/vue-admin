// 直接引入i18n/index.js中export出来的i18n，而不是像在组件中使用那样要新建一个i18n实例
import i18n from '@/i18n'

export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      // callback(new Error('密码不能少于6位'))
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
