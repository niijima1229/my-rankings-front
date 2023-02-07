import { FC } from 'react'
import useAuth from 'hooks/auth'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGuard: FC = () => {
    const isAuthenticated = useAuth()
    console.log(isAuthenticated)

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default AuthGuard
