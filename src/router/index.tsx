import { Navigate, useRoutes } from 'react-router-dom'
import { Login } from '@/pages/Login/Login.tsx'
import Error403 from '@/pages/403.tsx'
import Error404 from '@/pages/404.tsx'
import { Welcome } from '@/pages/Welcome/Welcome.tsx'

const routes = [
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/403',
    element: <Error403 />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '*',
    element: <Navigate to={'/404'} />
  }
]
export default function Router() {
  return useRoutes(routes)
}
