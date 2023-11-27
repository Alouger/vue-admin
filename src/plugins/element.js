import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/dist/index.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/es/locale/lang/en'
import store from '@/store'

export default (app) => {
  app.use(ElementPlus, { locale: store.getters.language === 'en' ? en : zhCn })
}
