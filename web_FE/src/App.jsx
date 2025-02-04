import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '~/pages/Login'
import Dashboard from '~/pages/Dashboard'
import { Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  if (localStorage.getItem('userInfo')) {
    return <Navigate to = "/dashboard" replace={true} />
  }
  return <Outlet />
}

const UnauthorizedRoutes = () => {
  if (!localStorage.getItem('userInfo')) {
    return <Navigate to = "/login" replace={true} />
  }
  return <Outlet />
}
function App() {

  return (
    <Routes>
      <Route path='/' element={
        <Navigate to="/login" replace={true} />
      } />

      <Route element={<UnauthorizedRoutes />}>
        <Route path='/dashboard' element={<Dashboard />} /> 
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
