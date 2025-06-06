import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout'
import Home from './components/pages/Home'
import Login from './components/pages/Login';
import ErrorPage from './components/pages/Error';
import Register from './components/pages/Register';
import Logout from './components/pages/Logout';
import Profile from './components/pages/Profile';
import { useAuth } from './store/auth';
import ApplicationForm from './components/pages/ApplicationForm';
import ViewApplication from './components/pages/ViewApplication';
import AdminLayout from './components/Layout/AdminLayout';
import AdminContacts from './components/pages/AdminContacts';
import AdminRecievedApplication from './components/pages/AdminRecievedApplication';
import AdminUsers from './components/pages/AdminUsers';
import AdminEditApplication from './components/pages/AdminEditApplication';
const App = () => {

  const {isLoggedIn, user} = useAuth();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
              <Route index element={<Home/>} />
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='logout' element={<Logout/>}/>
              {isLoggedIn && <Route path='profile/:userId' element={<Profile />} />}
              {isLoggedIn && <Route path='applicationForm' element={<ApplicationForm />} />}
                {isLoggedIn && <Route path='viewApplication/:userId' element={<ViewApplication/>} />}
                {
                  user.isAdmin && 
                  <Route path='/admin' element={<AdminLayout/>}>
                  <Route path='users' element={<AdminUsers/>}/>
                  <Route path='contacts' element={<AdminContacts/>}/>
                  <Route path='recievedApplications' element={<AdminRecievedApplication/>}/>
                  <Route path='editApplication/:userId' element={<AdminEditApplication/>}/>
              </Route>
                }

                
              <Route path='*' element={<ErrorPage/>}/>
        </Route>
        </Routes>
    </Router>
  )
}

export default App
