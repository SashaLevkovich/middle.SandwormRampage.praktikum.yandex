import axios from 'axios'
import AuthRequests from './requests/auth'

export const rootApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

export const authRequests = new AuthRequests()
