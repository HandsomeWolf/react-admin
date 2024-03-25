import { create } from 'zustand'

type UserInfo = {
  username: string
  avatar: string
}

type Action = {
  updateToken: (token: string) => void
  updateUserInfo?: (userInfo: UserInfo) => void
  updateUserName: (username: string) => void
}

interface State {
  token: string
  userInfo: UserInfo
}

export const useUserStore = create<State & Action>(set => ({
  token: '',
  userInfo: { username: '', avatar: 'http://xxxx.com/yy.jpg' },
  updateToken: token =>
    set(state => ({
      ...state, // 使用展开运算符复制所有既有状态
      token: token // 更新 token 值
    })),
  updateUserName: username =>
    set(state => ({
      ...state, // 再次使用展开运算符复制所有既有状态
      userInfo: {
        ...state.userInfo, // 复制 userInfo 对象内的其他属性
        username: username // 只更新 username 属性
      }
    }))
}))
