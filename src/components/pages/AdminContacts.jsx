import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../store/auth';
import axios from 'axios';
import { useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminContacts = () => {
        const [contacts, setContacts] = useState([]);
        const {authorizationToken, API} = useAuth();
        const URL= `${API}/api/admin/contact`

        const getAllContacts = async() => {
                try {
                        const response = await axios.get(URL,{
                        headers: {
                                Authorization : authorizationToken,
                                }
                        })

                        console.log(response);
                        const data = response.data;
                        console.log("all contacts : ", data);
                        setContacts(data);

                } catch (error) {
                        console.log(error);
                }
        }

        const deleteContact = async(id) => {
                // console.log(`${id} is delete`)
                try {
                        const deleteResponse =await axios.delete(`${API}/api/admin/contact/${id}`,
                        {
                                headers : {
                                Authorization:authorizationToken,
                                }
                        }
                )
                toast.success(`${id} is deleted!!`)
                console.log(deleteResponse)
                getAllContacts();
                } catch (error) {
                        console.log(error)
                        toast.error(error.data.message);
                }
        }

        useEffect(() => {
                getAllContacts()
        },[]);

  return (
    <div className='p-2 h-full'>
        <ToastContainer 
                 position="top-right"
                 autoClose={2000}
                closeOnClick
                pauseOnHover
                theme="colored"
        />
        <h1 className="text-2xl text-center  font-mono mb-4">All Contacts</h1>
        {
                contacts.map((contact) => {
                        return (
                        <div key={contact._id} className="border border-black  my-1 p-3 rounded-md shadow-md bg-gray-300 text-black">
                                <div className='flex justify-between'>
                                <p>{contact.message}</p>
                                <div className='text-red-600'>
                                        <button onClick={() => {
                                                if(confirm("are sure you want to delete ? ")){
                                                        deleteContact(contact._id)
                                                }
                                        }}>
                                                <MdDelete />
                                        </button>
                                </div>
                        </div>
                        <div className='mt-2 text-[10px] grid sm:grid-cols-4 grid-cols-2 gap-2' >
                        <div className="">{contact._id}</div>
                        <div className="">{contact.username}</div>
                        <div className="">{contact.email}</div>
                        <div className="">{contact.phone}</div>
                        </div>
        </div>
                        )
                })
        }
    </div>
  )
}

export default AdminContacts
