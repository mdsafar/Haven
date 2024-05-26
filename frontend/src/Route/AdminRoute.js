import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user)

    return (
        isAuthenticated && user?.role === "admin" ? <Outlet /> : <Navigate to={'/login'} />
    )

}

export default AdminRoute