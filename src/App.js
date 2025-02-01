import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'


import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard'
import ForgotPassword from './views/pages/forgot-password/forgot-password'
import ResetPassword from './views/pages/forgot-password/reset-password'
const HomePage = React.lazy(()=>import('./views/pages/home/homepage'))

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')


  useEffect(() => {
    setColorMode('light')
  }, [setColorMode]) 
 

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/forgot-password" name="Forgot Password" element={<ForgotPassword />} />
          <Route exact path="/reset-password" name="Reset Password" element={<ResetPassword />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
