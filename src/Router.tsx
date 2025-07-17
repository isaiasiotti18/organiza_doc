import { Route, Routes } from 'react-router-dom'
import { LoginForm } from './pages/LoginForm'
import { RegisterForm } from './pages/RegisterForm'
import { DefaultLayout } from './layout/DefaultLayout'

export function Router() {
  return(
    <Routes>
      <Route path='/' element={<DefaultLayout/>}>
        <Route path='login' element={<LoginForm/>} />
        <Route path='register' element={<RegisterForm/>} />
      </Route>
    </Routes>
  )
}