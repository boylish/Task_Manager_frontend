import React, { useState } from 'react'
import Sidebar from '../../components/ScreenLayouts/Sidebar'
import Navbar from '../../components/ScreenLayouts/Navbar'
import { Outlet } from 'react-router-dom'
import Allusers from '../../components/Manageusers/Allusers'
import ManageTaskDashboard from '../../components/ManageTasks/ManageTaskDashboard'

const CreateTask = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const handleToggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <main className="flex-1 p-6 overflow-auto">
        <Navbar title={"Manage Tasks"}  />
        <div className="bg-white p-6 rounded-xl shadow-sm">
         <ManageTaskDashboard/>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default CreateTask