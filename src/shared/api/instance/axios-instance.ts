import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

instance.interceptors.request.use(req => {
  const request = { ...req }

  if (typeof window !== 'undefined') {
    request.headers['x-accept-language'] = window.location.pathname.match(/^\/en\//) ? 'en' : 'ru'
  }

  return request
})
