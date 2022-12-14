import axios from 'axios'
import StorageKeys from '../constants/storage-keys'
const axiosClient = new axios.create({
  baseURL: 'https://tiktok.fullstack.edu.vn',
})

axiosClient.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem(StorageKeys.TOKEN) || ''
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axiosClient.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response.data
  },

  function (error) {
    const { config, status, data } = error.response
    const URLs = ['/api/auth/register', '/api/auth/login']
    if (URLs.includes(config.url) && [401, 400].includes(status)) {
      throw new Error('This user does not exist')
    }
    if (config.url === '/api/auth/register' && [401, 400, 409].includes(status)) {
      throw new Error('Email already exists')
    }
    return Promise.reject(error)
  }
)
export default axiosClient
