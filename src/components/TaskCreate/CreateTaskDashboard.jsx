import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import SelectUsers from "./SelectUsers";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateTaskDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taskId } = location.state || {};

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    assignedTo: [],
    todoChecklists: [],
    attachments: [],
  });

  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setTaskData((prev) => ({
        ...prev,
        todoChecklists: [
          ...prev.todoChecklists,
          { text: newChecklistItem.trim(), completed: false },
        ],
      }));
      setNewChecklistItem("");
    }
  };

  const handleDeleteChecklistItem = (index) => {
    const updated = taskData.todoChecklists.filter((_, i) => i !== index);
    setTaskData((prev) => ({ ...prev, todoChecklists: updated }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
      assignedTo: [],
      todoChecklists: [],
      attachments: [],
    });
    setNewChecklistItem("");
  };

  const createTask = async () => {
    try {
      await axiosInstance.post(API_PATHS.TASK.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
      });
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Create task error:", error);
    }
  };

  const updateTask = async () => {
    try {
      await axiosInstance.put(API_PATHS.TASK.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
      });
     
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Update task error:", error);
    }
  };

  const deleteTask = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirm) return;
    navigate("/admin/dashboard");

    try {
      await axiosInstance.delete(API_PATHS.TASK.DELETE_TASK(taskId));
    } catch (error) {
      console.error("Delete task error:", error);
    }
  };

  const handleSubmit = async () => {
    if (!taskData.title || !taskData.description) return;

    setLoading(true);
    try {
      if (taskId) {
        await updateTask();
      } else {
        await createTask();
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const getTaskDetailsbyID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASK.GET_TASK_BY_ID(taskId)
      );
      const data = response.data;
      setTaskData({
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: moment(data.dueDate).format("YYYY-MM-DD"),
        assignedTo: data.assignedTo || [],
        todoChecklists: data.todoChecklists || [],
        attachments: data.attachments || [],
      });
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsbyID();
    }
  }, [taskId]);

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8 rounded-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center">
        {taskId ? "Update Task" : "Create New Task"}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={taskData.title}
            onChange={(e) => handleValueChange("title", e.target.value)}
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Priority</label>
          <select
            name="priority"
            className="w-full border px-3 py-2 rounded-md"
            value={taskData.priority}
            onChange={(e) => handleValueChange("priority", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            rows={4}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={taskData.description}
            onChange={(e) => handleValueChange("description", e.target.value)}
            placeholder="Enter task description"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={taskData.dueDate}
            onChange={(e) => handleValueChange("dueDate", e.target.value)}
          />
        </div>
      </div>

      {/* Assign Users */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Assign Members</label>
        <SelectUsers
          selectedUsers={taskData.assignedTo}
          setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
        />
      </div>

      {/* Checklist UI */}
      <div className="mt-4">
        <label className="block mb-1 font-medium">To-Do Checklist</label>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            className="flex-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add checklist item"
            value={newChecklistItem}
            onChange={(e) => setNewChecklistItem(e.target.value)}
          />
          <button
            onClick={handleAddChecklistItem}
            className="bg-green-600 text-white text-sm px-1 py-1 sm:text-lg sm:px-3 sm:py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {taskData.todoChecklists.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
            >
              <span>{item.text}</span>
              <button
                onClick={() => handleDeleteChecklistItem(index)}
                className="text-red-600 hover:text-red-800 text-lg"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center mt-6 gap-3">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 w-full sm:w-auto"
          onClick={clearData}
        >
          Clear
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {taskId && (
            <button
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 w-full sm:w-auto"
              onClick={deleteTask}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Task"}
            </button>
          )}

          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : taskId ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskDashboard;
