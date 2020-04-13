import axios from 'axios'

console.log('NODE_ENV', process.env.NODE_ENV)

// Request interceptors
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Response interceptors
axios.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code != 0) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

const config = {
  get(url: string, params: any) {
    return axios({
      method: 'get',
      url,
      params,
    })
  },
  post(url: string, data: any) {
    return axios({
      method: 'post',
      url,
      data,
    })
  },
}

export default config
