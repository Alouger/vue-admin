/**
 * 该文件中需要完成两件事情：
 * 1. 导入所有的 svg 图标
 *  因为我们的SvgIcon可能在整个项目的多个组件里面被使用，
 *  为了避免每次都进行局部注册，我们直接在这里进行一个全局的注册
 * 2. 完成 SvgIcon 的全局注册
 */
import SvgIcon from '@/components/SvgIcon'

// 通过 require.context() 函数来创建自己的 context
// 三个参数：一个是要搜索的目录，一个是标记表示是否还搜索其子目录，以及一个匹配文件的正则表达式，在此的正则表达式是匹配所有以.svg结尾的文件
const svgRequire = require.context('./svg', false, /\.svg$/)
// 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
// 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

// 导出一个函数，这个app对应的就是main.js中的app
export default app => {
  app.component('svg-icon', SvgIcon)
}
