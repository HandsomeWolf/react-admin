import { App as AntdApp } from 'antd'
import './App.css'
import Router from './router'
import AntdGlobal from '@/utils/AntdGlobal.tsx'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <AntdApp>
      <AntdGlobal />
      <RouterProvider router={Router} />
    </AntdApp>
  )
}

export default App
