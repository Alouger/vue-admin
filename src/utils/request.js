import axios from 'axios'

const service = axios.create({
  // 实现在开发和生产环境下，可以设定不同baseUrl的能力
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

export default service
