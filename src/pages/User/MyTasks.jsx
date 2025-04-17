import React, { useState } from 'react'
import Sidebar from "../../components/ScreenLayouts/Sidebar";
import Navbar from "../../components/ScreenLayouts/Navbar";
import { Outlet } from "react-router-dom";
import UsersTasks from '../../components/UserDashboard/UsersTasks';


const MyTask = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen   bg-gray-100">
      <div className="w-[1.5%]">
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      <main className="flex flex-col w-full  p-6 overflow-auto sm:ml-64">
        <Navbar title="All Tasks" onToggleSidebar={handleToggleSidebar} />
        <div className="bg-gray p-6 rounded-xl  w-full ">
          <UsersTasks/>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MyTask