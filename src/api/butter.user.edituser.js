import request from '@/plugin/axios'

export function setUser (params) {
  return request({
    url: '/auth/user/'+params['id']+'/',
    method: 'post',
    data:params
  })
}
