import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminEditApplication = () => {
        const [applicationData, setApplicationData] = useState({})
        const [error, setError] = useState();
        const navigate = useNavigate();

        const { userId } = useParams();
        const { authorizationToken, API } = useAuth();
        console.log(userId)
        const getApplication =async() => {
                try {
                        const response =await  axios.get(`${API}/api/admin/application/${userId}`,{
                                headers: {
                                        Authorization : authorizationToken,
                                }
                })
                console.log(response.data);
                setApplicationData(response.data)
                } catch (error) {
                        console.log(error);
                        setError(error.response.data.message);
                }
        }
	

        const handleChange = (e) => {
                const {name, value} = e.target;
                setApplicationData({
                        ...applicationData,[name]:value
                })
        }

        const  handleSubmit = async (e) => {
                e.preventDefault();
                console.log(applicationData);
                try {
                        const response = await axios.patch(`${API}/api/admin/application/${applicationData._id}`, applicationData,{
                                headers:{
                                        Authorization: authorizationToken,
                                        "Content-Type": "application/json"
                                }
                        })
                        console.log(response);
                        toast.success("Application updated!!")
                } catch (error) {
                        console.log(error)
                        toast.error(error.data.message);
                }
        }

        useEffect(() =>{
                getApplication()
        },[userId])

        if(error) {
                return (
                        <div className="text-red-500 text-center mt-10 h-screen">
                                <div>{error}</div>
                                <br />
                                <button onClick={() =>navigate(-1)} className="bg-red-600 text-white p-1 rounded-md font-bold m-5 hover:bg-red-800">Go Back</button>
                        </div>
                )
        }

        if (!applicationData) {
		return (
			<div className="text-black text-center m-10 h-screen">
				Loading application data...
			</div>
		);
	}

  return (
    <div>
      <div className="max-w-2xl m-5 p-6 bg-white shadow-lg rounded-lg  text-[10px]">
        <ToastContainer 
		position="top-right"
		autoClose={2000}
		closeOnClick
		 pauseOnHover
		theme="colored"
	/>
		<h1 className='text-center text-lg font-mono underline'>application form</h1>
			<form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-2">
                                <div>
				<input
					type="text"
					name="name"
					placeholder="Full Name"
					value={applicationData.name || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				/>
                                </div>
                                <div>
				<input
					type="text"
					name="fatherName"
					placeholder="Father's Name"
					value={applicationData.fatherName || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				/>
                                </div>
                                <div>
				<input
					type="date"
					name="dob"
					value={applicationData.dob ? applicationData.dob.slice(0,10) : ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				/>
                                </div>
                                <div>
				<select
					name="gender"
					value={applicationData.gender || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				>
					<option value="">Select Gender</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Other">Other</option>
				</select>
                                </div>
                                <div>
				<input
					type="text"
					name="aadharNumber"
					placeholder="Aadhar Number"
					value={applicationData.aadharNumber || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				/>
                                </div>
                                <div>
				<input
					type="text"
					name="mobileNumber"
					placeholder="Mobile Number"
					value={applicationData.mobileNumber || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				/>
                                </div>
                                <div>
				<input
					type="email"
					name="email"
					placeholder="Email (optional)"
					value={applicationData.email || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
				/>
                                </div>
                                <div>
				<textarea
					name="address"
					placeholder="Address"
					value={applicationData.address || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded col-span-2"
					required
				/>
                                </div>
                                <div>
				<input
					type="text"
					name="college"
					placeholder="College Name"
					value={applicationData.college || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				/>
                                </div>
                                <div>
				<input
					type="text"
					name="course"
					placeholder="Course"
					value={applicationData.course || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				/>
                                </div>
                                <div>
				<input
					type="text"
					name="session"
					placeholder="Session (e.g. 2023-2026)"
					value={applicationData.session || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				/>
                                </div>
                                <div>
				<input
					type="text"
					name="currentAcademicSession"
					placeholder="Current Academic Session (e.g. 2nd Year)"
					value={applicationData.currentAcademicSession || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				/>
                                </div>
                                <div>
				<select
					name="religion"
					value={applicationData.religion || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				>
					<option value="">Select Religion</option>
					<option value="Hindu">Hindu</option>
					<option value="Muslim">Muslim</option>
					<option value="Christian">Christian</option>
					<option value="Sikh">Sikh</option>
					<option value="Buddhist">Buddhist</option>
					<option value="Jain">Jain</option>
					<option value="Other">Other</option>
				</select>
                                </div>
                                <div>
				<select
					name="category"
					value={applicationData.category || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				>
					<option value="">Select Category</option>
					<option value="General">General</option>
					<option value="OBC">OBC</option>
					<option value="SC">SC</option>
					<option value="ST">ST</option>
					<option value="EWS">EWS</option>
					<option value="Other">Other</option>
				</select>
                                </div>
                                <div>
				<input
					type="text"
					name="caste"
					placeholder="Caste"
					value={applicationData.caste || ""}
					onChange={handleChange}
					className="w-full p-1 border rounded"
					required
				/>
                                </div>
                                <div className=" flex items-center gap-3">
                                <label htmlFor="isAlloted" className="text-sm text-gray-700">
                                        Allot Hostel
                                </label>
  
                                <button type="button"onClick={() => setApplicationData((prev) => (
                                        {...prev,isAlloted: !prev.isAlloted,
                                 }))
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                                applicationData.isAlloted ? 'bg-green-600' : 'bg-gray-300'
                                }`}
                                >
                        <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                applicationData.isAlloted ? 'translate-x-6' : 'translate-x-1'
                         }`}
                        />
                        </button>
                        </div>
                                <br/>
				<button
					type="submit"
					className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-900 col-span-2"
				>
					Update
				</button>
			</form>
		</div>
    </div>
  )
}

export default AdminEditApplication
