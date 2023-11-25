import request from '@/utils/request'

/**
 * 登录
 * 返回一个promise实例
 */
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    // 请求参数
    data
  })
}
