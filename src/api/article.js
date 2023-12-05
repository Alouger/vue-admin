import request from '@/utils/request'

/**
 * 获取文章列表
 */
export const getArticleList = (data) => {
  return request({
    url: '/article/list',
    method: 'GET',
    params: data
  })
}
