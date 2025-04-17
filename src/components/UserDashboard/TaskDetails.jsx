import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [checklist, setChecklist] = useState([]);

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASK.GET_TASK_BY_ID(id)
      );
      
      if (response.data) {
        const taskInfo = response.data;
        setTask(taskInfo);
        setChecklist(taskInfo.todoChecklists || []);
      }
    } catch (error) {
      console.log("Error in task fetching:", error);
    }
  };

  useEffect(() => {
    getTaskDetailsById();
  }, []);

  const updateTodoChecklist = async (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].completed = !updatedChecklist[index].completed;
    setChecklist(updatedChecklist);

    try {
      await axiosInstance.put(API_PATHS.TASK.UPDATE_TODO_CHECKLIST(id), {
        todoChecklists: updatedChecklist,
      });
    } catch (error) {
      console.error("Error updating checklist:", error);
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 sm:w-full">
      <div className="flex flex-col gap-4 bg-white shadow-sm px-8 py-6 w-full rounded-lg">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Task Details</h1>

        <div className="space-y-2">
          <div className="break-words">
            <p>
              <strong>Title:</strong>
            </p>
            <p className="whitespace-pre-wrap">{task.title}</p>
          </div>
          <div className="break-words mt-2">
            <p>
              <strong>Description:</strong>
            </p>
            <p className="whitespace-pre-wrap">{task.description}</p>
          </div>

          <p>
            <strong>Priority:</strong> {task.priority}
          </p>
          <p>
            <strong>Status:</strong> {task.status}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(task.dueDate).toLocaleDateString()}
          </p>

          <div>
            <strong>Assigned To:</strong>
            {task.assignedTo?.map((user) => (
              <div key={user._id} className="ml-4 mt-1">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-4" />

        <div>
          <h2 className="text-lg font-medium mb-2">Checklist</h2>
          <ul className="list-none space-y-2">
            {checklist.map((item, index) => (
              <li key={item._id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => updateTodoChecklist(index)}
                />
                <span
                  className={item.completed ? "line-through text-gray-500" : ""}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
