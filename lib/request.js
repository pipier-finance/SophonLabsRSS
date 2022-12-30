import axios from 'axios'
import BLOG from '@/blog.config'

axios.interceptors.request.use(config => {
  // Do something before request is sent
  config.url = BLOG.RSS_SOURCE_ADDRESS
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(response => {
  // Do something with response data
  return response
}, error => {
  // Do something with response error
  return Promise.reject(error)
})

export default axios
