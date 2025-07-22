import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginForm } from './pages/LoginForm'
import { RegisterForm } from './pages/RegisterForm'
import { DefaultLayout } from './layout/DefaultLayout'
import { LoginRegisterLayout } from './layout/LoginRegisterLayout'
import { Home } from './pages/Home'

export function Router() {
  return(
    <Routes>
      <Route path='/' element={<LoginRegisterLayout/>}>
        <Route path='/' element={<Navigate to="/login" replace={true}/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='register' element={<RegisterForm/>} />
      </Route>

      <Route path='/app' element={<DefaultLayout/>}>
        <Route path='home' element={<Home />} />
        <Route path='categorie/:categorie'></Route>
      </Route>
    </Routes>
  )
}