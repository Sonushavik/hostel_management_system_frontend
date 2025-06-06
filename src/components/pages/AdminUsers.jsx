import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../store/auth'
import axios from 'axios'
import { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminUsers = () => {
  const [users,setUsers] = useState([])
  const [error, setError] = useState();
  const { authorizationToken, API } = useAuth();
  const URL = `${API}/api/admin/users`
  console.log(URL)

  const getAllUsersData = async() => {
      try {
          const response = await axios.get(URL,{
            headers : {
              Authorization : authorizationToken,
            }
          })
          const data = await response.data;
          console.log("users:", data);
          setUsers(data);
      } catch (error) {
        console.log(error)
        setError(error)
      }
  }

const deleteUser = async(id) => {
  console.log(`${id} is deleted`)
  try {
      const deleteUser  = await axios.delete(`${API}/api/admin/user/${id}`,{
    headers: {
      Authorization: authorizationToken,
    }
  })
  console.log(deleteUser)
  toast.success("user deleted!!");
  getAllUsersData();
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    getAllUsersData();
  },[URL])

  if (!users) {
		return (
			<div className="text-black text-center m-10 h-screen">
				Loading  data...
			</div>
		);
	}

  return (
  <div className="p-2">
    <ToastContainer 
				  position="top-right"
				  autoClose={2000}
				  closeOnClick
				  pauseOnHover
				  theme="colored"
			/>
  <h1 className="text-2xl text-center  font-mono mb-4">All Users</h1>

  <div className="shadow-md rounded-lg ">
    <table className="w-full text-sm text-left rtl:text-right border-gray-300 min-w-full rounded-lg">
      <thead className="bg-red-950 text-white font-mono">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-left">Id</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
          <th className="border border-gray-300 px-4 py-2 text-left">User-Type</th>
          <th className="border border-gray-300 px-4 py-2 text-left"></th>
          <th className="border border-gray-300 px-4 py-2 text-left"></th>
        </tr>
      </thead>
      <tbody className='font-light'>
      {
        users.map((user) => {
          return (
              <tr key={user._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user._id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{user.isAdmin ? "Admin" : "student"}</td>
              <td  className=' border border-gray-300 px-4 py-2 '><button className='text-red-700' onClick={() =>{
                  if(confirm("confirm you want to delete ? ")){
                     deleteUser(user._id)
                  }
              }}><MdDelete /></button></td>
              <td  className=' border border-gray-300 px-4 py-2 '>
                <Link to={`/viewApplication/${user._id}`}>
                {/* <Link to={`/admin/viewApplication/${user._id}`}> */}
                  <button className='text-green-700'><FaEye /></button>
                </Link>
                </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  </div>
</div>

  )
}

export default AdminUsers
