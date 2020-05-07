import request from '@/plugin/axios'

export function getLabel () {
  return request({
    url: '/ci/label',
    method: 'get',
  })
}
