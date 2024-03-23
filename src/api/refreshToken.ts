import request from '@/utils/request'

export function expireToken() {
  return request.get('/expireToken')
}

export function refreshToken() {
  return request.get<{ token: string }>('/refreshToken')
}
