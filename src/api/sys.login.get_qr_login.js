import request from '@/plugin/axios'

export function get_qr_login_url () {
  return request({
    url: '/auth/quick_login_url',
    method: 'get',
  })
}
