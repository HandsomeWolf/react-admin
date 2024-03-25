import { Button } from 'antd'
import { useUserStore } from '@/store'

export const Welcome = () => {
  const token = useUserStore(state => state.token)
  const updateToken = useUserStore(state => state.updateToken)
  const userInfo = useUserStore(state => state.userInfo)
  const updateUsername = useUserStore(state => state.updateUserName)

  function getTokenClick() {
    console.log(token)
  }

  function updateTokenClick() {
    updateToken('辰火流光')
  }

  function getUserInfoClick() {
    console.log(userInfo)
  }

  function updateUsernameClick() {
    updateUsername('辰火流光')
  }

  return (
    <div>
      <Button onClick={updateTokenClick}>更新Token</Button>
      <Button onClick={getTokenClick}>获取Token</Button>

      <Button onClick={updateUsernameClick}>设置Username</Button>
      <Button onClick={getUserInfoClick}>获取UserInfo</Button>
    </div>
  )
}
