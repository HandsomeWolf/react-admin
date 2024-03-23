import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { showLoading, hideLoading } from '@/utils/loading.ts'
import { Result } from '@/types/api'
import { message } from './AntdGlobal'
import storage from './localStorage'
import config from '@/config/net.config.ts'
import router from '@/router'
import { CODE_MESSAGE } from '@/constants/httpStatusCodes.ts'
import { refreshToken } from '@/api/refreshToken.ts'

declare module 'axios' {
  interface AxiosRequestConfig {
    isShowLoading?: boolean
    isShowError?: boolean
  }
}

interface IConfig {
  isShowLoading?: boolean
  isShowError?: boolean
}

const { baseURL, messageName, requestTimeout, statusName, successCode, timeoutErrorMessage } = config

let refreshToking = false
const requests: (() => void)[] = []

/**
 * 请求拦截器配置
 * @param config
 */
const requestConfig = (config: InternalAxiosRequestConfig) => {
  if (config.isShowLoading) showLoading()
  const token = storage.get('token')
  // 规范写法
  if (token) config.headers!.Authorization = 'Bearer ' + token
  // 非规范写法
  // if (token) config.headers['token'] = token
  return config
}
/**
 * 刷新令牌
 * @param config
 */
const tryRefreshToken = async (config: InternalAxiosRequestConfig) => {
  if (!refreshToking) {
    refreshToking = true
    try {
      const {
        data: { token }
      } = await refreshToken()

      if (token) {
        storage.set('token', token)
        requests.forEach(req => req())
        requests.length = 0
        return instance(requestConfig(config))
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('刷新令牌错误：', error)
      router.navigate('/login', { replace: true }).then(() => {})
    } finally {
      refreshToking = false
    }
  } else {
    return new Promise(resolve => {
      requests.push(() => {
        resolve(instance(requestConfig(config)))
      })
    })
  }
}

const responseData = async ({ config, data, status, statusText }: AxiosResponse) => {
  hideLoading()
  if (config.responseType === 'blob') return data
  let code: number = data && data[statusName] ? data[statusName] : status
  if (successCode.includes(data[statusName])) code = 200
  switch (code) {
    case 200:
      return data
    case 401:
      router.navigate('/login?redirect=' + encodeURIComponent(location.href), { replace: true }).then(() => {
        storage.remove('token')
        message.error(data.msg)
      })
      break
    case 402:
      // 刷新令牌
      return await tryRefreshToken(config)
  }
  if (config.isShowError === true) {
    const errorMessage =
      data && data[messageName] ? data[messageName] : CODE_MESSAGE[code] ? CODE_MESSAGE[code] : statusText
    message.error(errorMessage)
  }
  return Promise.reject(data)
}

// 创建 axios 实例
const instance = axios.create({
  baseURL: baseURL,
  timeout: requestTimeout,
  timeoutErrorMessage: timeoutErrorMessage,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
instance.interceptors.request.use(requestConfig, (error: AxiosError) => Promise.reject(error))

// 响应拦截器
instance.interceptors.response.use(responseData, (error: AxiosError) => {
  hideLoading()
  message.error(error.message)
  return Promise.reject(error.message)
})

export default {
  get<T>(
    url: string,
    params?: object,
    options: IConfig = { isShowLoading: true, isShowError: true }
  ): Promise<Result<T>> {
    return instance.get(url, { params, ...options })
  },
  post<T>(url: string, params?: object, options: IConfig = { isShowLoading: true, isShowError: true }): Promise<T> {
    return instance.post(url, params, options)
  },

  downloadFile(url: string, data: any, fileName = 'fileName.xlsx') {
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response.data], {
        type: response.data.type
      })
      const name = (response.headers['file-name'] as string) || fileName
      const link = document.createElement('a')
      link.download = decodeURIComponent(name)
      link.href = URL.createObjectURL(blob)
      document.body.append(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    })
  }
}
