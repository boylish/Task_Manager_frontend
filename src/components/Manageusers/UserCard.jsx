import React from "react";
import { FaUserCircle } from "react-icons/fa";

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-full sm:max-w-sm mx-auto flex flex-col gap-5 transition hover:shadow-lg">
      {/* Profile Section */}
      <div className="flex gap-4 items-center flex-wrap sm:flex-nowrap">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
          {user.profileImage && user.profileImage.startsWith("http") ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-4xl md:text-5xl text-gray-400" />
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-base md:text-lg font-semibold">{user.name}</h3>
          <p className="text-xs md:text-sm text-gray-600 break-words">
            {user.email}
          </p>
          <span className="text-xs mt-1 py-1 px-2 w-fit bg-blue-100 text-blue-600 rounded-md">
            {user.role}
          </span>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-md bg-gray-100 p-2 text-red-500 flex flex-col items-center overflow-hidden break-words">
          <span className="text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            Pending
          </span>
          <span className="font-medium text-xs md:text-sm">
            {user.pendingTasks}
          </span>
        </div>

        <div className="rounded-md bg-gray-100 p-2 text-yellow-500 flex flex-col items-center overflow-hidden break-words">
          <span className="text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            Progress
          </span>
          <span className="font-medium text-xs md:text-sm">
            {user.inProgressTasks}
          </span>
        </div>

        <div className="rounded-md bg-gray-100 p-2 text-green-600 flex flex-col items-center overflow-hidden break-words">
          <span className="text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            Completed
          </span>
          <span className="font-medium text-xs md:text-sm">
            {user.completedTasks}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
