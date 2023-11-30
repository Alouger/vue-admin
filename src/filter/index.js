import dayjs from 'dayjs'

// 日期过滤器
const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs(val).format(format)
}

// 函数被导出为一个对象，该对象包含全局属性$filters，其值为一个包含dateFilter函数的对象。
export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
