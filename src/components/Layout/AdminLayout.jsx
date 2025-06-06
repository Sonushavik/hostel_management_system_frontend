import React from 'react'
import AdminSideBar from '../pages/AdminSideBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../store/auth'

const AdminLayout = () => {

  const {user, isLoading} = useAuth();
  // if(isLoading){
  //   return <h1 className='h-screen text-center mt-10'>Loading...</h1>
  // }

if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='grid grid-cols-[auto_1fr]  mx-auto max-w-[1240px] h-screen'>
        <AdminSideBar/>
        <main className='overflow-scroll scrollbar-hide my-2'>
                <Outlet/>
        </main>
    </div>
  )
}

export default AdminLayout
