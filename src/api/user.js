import request from '@/utils/request'

export const features = () => {
  return request({
    url: '/user/feature'
  })
}
