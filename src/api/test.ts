import request from '@/utils/request'

interface Posts {
  author: string
  id: number
  title: string
}

export function getPosts(params?: { id: number; title: string; author: string }) {
  return request.get<Posts[]>('/posts', params)
}
