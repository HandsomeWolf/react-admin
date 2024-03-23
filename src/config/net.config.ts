export default {
  // API接口地址
  baseURL: import.meta.env.VITE_MOCK === 'true' ? import.meta.env.VITE_MOCK_API : import.meta.env.VITE_BASE_API,

  // 网络请求的超时时间
  requestTimeout: 10000,

  // 请求超时时的错误信息
  timeoutErrorMessage: '请求超时，请稍后重试',

  // 请求成功时服务端返回的状态码
  successCode: [200, 0],

  // 服务端返回的状态字段名
  statusName: 'code',
  // 服务端返回的消息的字段名
  messageName: 'message'
}
