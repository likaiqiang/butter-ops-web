import request from '@/plugin/axios'

export function getVersion () {
  return request({
    url: '/doc/version',
    method: 'get',
  })
}
