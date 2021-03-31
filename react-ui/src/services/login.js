import axios from 'axios'
const baseUrl = '/api/login'

export const loginApi = axios.create({
  baseURL: baseUrl
})

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const loginService = { login }

export default loginService
