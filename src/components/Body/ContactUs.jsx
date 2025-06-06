import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../store/auth";
import axios from "axios";
import { MdContactMail } from "react-icons/md";


function ContactUs() {
  const { user, API } = useAuth(); 
  const [contact, setContact] = useState({
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    message: "",
  });

  const URL = `${API}/api/contact/contactForm`;

  useEffect(() => {
		if (user) {
			setContact((prev) => ({
				...prev,
				username: user.username || "",
				email: user.email || "",
				phone: String(user.phone || ""),
			}));
		}
}, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL, contact, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      toast.success("Message sent successfully!");

     setContact({
         username:  "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        toast.error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from the server");
      } else {
        console.error("Request error:", error.message);
        toast.error("Something went wrong with the request");
      }
    }
  };

  return (
    <div className="max-w-[1240px] py-10 bg-red-900 bg-opacity-10 mx-auto font-mono">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <h3 className="text-[20px] md:text-[30px] font-bold mb-8 text-center">
        Contact Us
      </h3>
      <div className="grid sm:grid-cols-2 border border-black p-2 rounded-md sm:mx-20 mx-2">
        <div className="w-full flex flex-col justify-center items-center p-5 text-lg sm:text-xl font-serif">
	   <div className="text-6xl text-red-950"><MdContactMail /></div>
          <div>Location: Sikandarpur, Muzaffarpur</div>
          <div>Mobile: 1234567890</div>
          <div>Email: abc@gmail.com</div>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-red-950 p-4 text-sm text-black text-opacity-70 rounded-md"
          >
            <div>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Your Name"
                value={contact.username}
                onChange={handleInput}
                className="p-2 rounded-sm w-full"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="abc@gmail.com"
                value={contact.email}
                onChange={handleInput}
                className="p-2 rounded-sm w-full"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="1234567890"
                value={contact.phone}
                onChange={handleInput}
                className="p-2 rounded-sm w-full"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                id="message"
                placeholder="Write your message here..."
                value={contact.message}
                onChange={handleInput}
                required
                rows={4}
                className="p-2 rounded-sm w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-center p-2 rounded-md font-bold text-[1rem] hover:bg-red-700 hover:scale-y-105 transition-transform"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
