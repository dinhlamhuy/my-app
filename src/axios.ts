import axios from 'axios'

const instance: any = axios.create({
  baseURL: 'http://localhost:50048/api',
  // baseURL: 'http://192.168.32.169:8080/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

instance.interceptors.response.use((response: any) => {
  // Thrown error for request with OK status code
  const { data } = response
  return response.data
})

export default instance
