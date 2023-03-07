import { FC, useEffect, useState } from 'react'
import useAuth from 'hooks/auth'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from 'pages/Loading'

const AuthGuard: FC = () => {
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const fetchAuth: any = async () => {
            const response = await useAuth()
            setIsAuthenticated(response)
            setLoading(false)
        }

        fetchAuth()
    }, [])

    if (loading) {
        return <Loading />
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default AuthGuard
