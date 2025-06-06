import React from 'react'
import { useAuth } from '../../store/auth'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { MdDelete,MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminRecievedApplication = () => {

        const [applicationData, setApplicationData] = useState([]);
        const {authorizationToken, API} = useAuth();
        const URL = `${API}/api/admin/applications`;

        const getApplicationData =async () => {
                try {
                        const response =await axios.get(URL,{
                                headers: {
                                        Authorization : authorizationToken,
                                }
                        })

                        const data = await response.data;
                        console.log("applicationData", data);
                        setApplicationData(data);
                } catch (error) {
                        console.log(error)
                }
        }

        const deleteApplication = async (id) => {
          try {
              const response = await axios.delete(`${API}/api/admin/application/${id}`,{
                  headers:{
                    Authorization: authorizationToken,
                  }
              })
              console.log(response)
              toast.success("application deleted!!")
              getApplicationData();
          } catch (error) {
            console.log(error);
          }
        }


        useEffect(() => {
                getApplicationData();
        },[])

        if (!applicationData) {
		    return (
			<div className="text-black text-center m-10 h-screen">
				Loading application data...
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
      <h1 className="text-2xl text-center  font-mono mb-4">All Applications</h1>
      <div className=" rounded-lg  ">
        <table className="w-full text-sm text-left rtl:text-right border-gray-300 min-w-full rounded-lg">
          <thead className="bg-red-950 text-white font-mono">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Application-id</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Father's Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Session</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
              <th className="border border-gray-300 px-4 py-2 text-left"></th>
              <th className="border border-gray-300 px-4 py-2 text-left"></th>
              <th className="border border-gray-300 px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody className='font-light'>
          {
            applicationData.map((application) => {
              return (
                  <tr key={application._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{application._id}</td>
                  <td className="border border-gray-300 px-4 py-2">{application.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{application.fatherName}</td>
                  <td className="border border-gray-300 px-4 py-2">{application.session}</td>
                  <td className="border border-gray-300 px-4 py-2 font-extrabold">{application.isAlloted ? <span className='text-green-600'>Alloted</span> : <span className='text-red-600'>Not Alloted</span>}</td>
                <td  className=' border border-gray-300 px-4 py-2 '>
                  <Link to={`/admin/editApplication/${application.userId}`}>
                    <button className='text-blue-700'>
                      <MdEdit />
                    </button>
                  </Link>
                </td>
                  <td  className=' border border-gray-300 px-4 py-2 '>
                    <Link to={`/viewApplication/${application.userId}`}>
                {/* <Link to={`/admin/viewApplication/${user._id}`}> */}
                  <button className='text-green-700'><FaEye /></button>
                </Link>
                    </td>
                  <td  className=' border border-gray-300 px-4 py-2 '>
                    <button className='text-red-700' onClick={() => {
                      if(confirm("are you sure want to delete?")){
                        deleteApplication(application._id)
                      }
                    }}>
                      <MdDelete />
                    </button>
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

export default AdminRecievedApplication
