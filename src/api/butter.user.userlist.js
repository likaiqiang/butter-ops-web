import request from '@/plugin/axios'

export function getUserList (params) {
  return request({
    url: '/auth/user',
    method: 'get',
    params
  })
}
