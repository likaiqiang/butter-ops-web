import request from '@/plugin/axios'

export function setLabel (params) {
  return request({
    url: '/ci/label',
    method: 'post',
    data:params
  })
}
