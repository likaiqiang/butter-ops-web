import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import util from '@/libs/util'

// 创建一个错误
function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 记录和显示错误
function errorLog (error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API + process.env.VUE_APP_API_VERSION,
  timeout: 20000, // 请求超时时间
  ithCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['token'] = token
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    console.log(dataAxios)
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      console.log(1)
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios
        case 'xxx':
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
          break
        default:
          // 不是正确的 code
          errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          break
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '权限拒绝'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
      switch (error.response.data.code) {
        case 10001: error.message = '缺少必要的参数'; break
        case 10002: error.message = '参数类型错误'; break
        case 10003: error.message = '参数长度异常'; break
        case 11001: error.message = '用户名密码错误'; break
        case 11002: error.message = '登录状态已过期'; break
        case 11003: error.message = '获取认证信息失败，请确认请求信息中包含认证信息'; break
        case 11004: error.message = '认证信息不存在，请重新登录'; break
        case 11005: error.message = '当前用户信息不存在'; break
        case 11006: error.message = '认证失败'; break
        case 11007: error.message = '获取app access token失败'; break
        case 11008: error.message = '获取飞书QR code失败，请联系管理员'; break
        case 11009: error.message = '获取tenant access token失败'; break
        case 11010: error.message = '用户已被冻结'; break
        case 11011: error.message = '获取飞书用户信息失败失败'; break
        case 11012: error.message = '用户名或密码错误'; break
        case 12001: error.message = '未授权的操作'; break
        case 13001: error.message = '商品不存在'; break
        case 13002: error.message = '邮件发送失败'; break
        case 13003: error.message = '调用飞书接口异常'; break
        default: break
      }
      if(error.response.data.msg){
        error.message = error.response.data.msg
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
