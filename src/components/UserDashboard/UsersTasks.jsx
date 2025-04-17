import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const UsersTasks = () => {
  const navigate = useNavigate();
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  const getAllTasks = async (status) => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASK.GET_ALL_TASKS, {
        params: {
          status: status === "All" ? "" : status,
        },
      });

      const tasks = response.data?.tasks || [];
      const statusSummary = response.data?.statusSummary || {};

      setAllTasks(tasks);

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "pending", count: statusSummary.pendingTasks || 0 },
        { label: "in-progress", count: statusSummary.inProgressTasks || 0 },
        { label: "completed", count: statusSummary.completedTasks || 0 },
      ];

      setTabs(statusArray);
    } catch (error) {
      console.error("Error in fetching tasks", error);
    }
  };

  const handleClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`);
  };

  useEffect(() => {
    getAllTasks(filterStatus);
  }, [filterStatus]);

  return (
    <div className="p-4 sm:p-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base rounded-full cursor-pointer transition duration-200 ${
              filterStatus === tab.label
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-blue-100 text-gray-700"
            }`}
            onClick={() => setFilterStatus(tab.label)}
          >
            {capitalize(tab.label)} ({tab.count})
          </button>
        ))}
      </div>

      {/* Tasks Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {allTasks.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No tasks found.
          </p>
        ) : (
          allTasks.map((task) => (
            <div
              key={task._id}
              className="border rounded-lg shadow-sm p-4 hover:shadow-md cursor-pointer transition bg-white"
              onClick={() => handleClick(task._id)}
            >
              <h3 className="text-base sm:text-lg font-semibold text-blue-600 mb-1 truncate">
                {task.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-2 break-words line-clamp-3">
                {task.description?.length > 100
                  ? `${task.description.slice(0, 100)}...`
                  : task.description}
              </p>
              <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="capitalize text-lime-600">{task.status}</span>
                </p>
                <p>
                  <strong>Priority:</strong> {capitalize(task.priority)}
                </p>
                <p>
                  <strong>Due:</strong>{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "Not set"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersTasks;
