import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { RiFileExcel2Line } from "react-icons/ri";
import { Loader2 } from "lucide-react"; // Spinner icon from lucide-react
import UserCard from "./UserCard";

const Allusers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);


  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error in Downloading", error);
    }
  };

  return (
<div className="p-4">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <h2 className="text-xl font-semibold">Team Members</h2>
    <button
      onClick={handleReport}
      className="flex items-center gap-2 bg-lime-300 py-2 px-4 rounded-md text-lime-800 hover:bg-lime-400 transition"
    >
      <RiFileExcel2Line className="text-xl" />
      <span>Download</span>
    </button>
  </div>

  {/* Grid for cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
    {loading ? (
      <div className="col-span-full flex flex-col items-center justify-center mt-10">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        <span className="mt-2 text-sm text-gray-500">Fetching users...</span>
      </div>
    ) : (
      allUsers.map((user) => <UserCard key={user._id} user={user} />)
    )}
  </div>
</div>

  );
};

export default Allusers;
