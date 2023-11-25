/**
 * 存储数据
 */
export const setItem = (key, value) => {
  // value 分为两种情况：
  // 1. 基本数据类型
  // 2. 复杂数据类型
  if (typeof value === 'object') {
    // 将数组、对象类型的数据转化为 JSON 字符串进行存储
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  // 因为我们在setItem的时候对复杂数据类型进行了一个转换字符串的操作
  // 所以我们在取数据时，就需要转化回来，直接用JSON.parse()进行转化，如果过程中报错，也直接return出来
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * 删除指定数据
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}
