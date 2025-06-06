import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { MdOutlineDriveFileMove, MdContactMail } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const AdminSideBar = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-red-900 to-black  text-white shadow-md p-4 w-20 md:w-64 transition-all duration-300 scroll-none">
      <ul className="space-y-4">
        <NavLink to="users">
                <li className="flex items-center gap-3 hover:bg-red-600 p-2 rounded cursor-pointer transition-all">
          <FaUsers className="text-xl" />
          <span className="hidden md:inline">Users</span>
        </li>
        </NavLink>
        <NavLink to="recievedApplications">
        <li className="flex items-center gap-3 hover:bg-red-600 p-2 rounded cursor-pointer transition-all">
          <MdOutlineDriveFileMove className="text-xl" />
          <span className="hidden md:inline">Applications</span>
        </li>
        </NavLink>
        <NavLink to="contacts">
        <li className="flex items-center gap-3 hover:bg-red-600 p-2 rounded cursor-pointer transition-all">
          <MdContactMail className="text-xl" />
          <span className="hidden md:inline">Contacts</span>
        </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default AdminSideBar;
