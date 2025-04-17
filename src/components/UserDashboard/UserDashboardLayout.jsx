import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import InfoCard from "../AdminDashboard/InfoCard";
import { IoMdArrowDropright } from "react-icons/io";
import { addThousandSeparator } from "../../utils/helper";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CustomPieChart from "../AdminDashboard/CustomPieChart";
import CustomBarChart from "../AdminDashboard/CustomBarChart";

const COLORS = ["#8D51FF", "00B8D8", "7BCE00"];

const UserDashboardLayout = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]); // Added state for recent tasks
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const prepareChartData = (charts) => {
    if (!charts) return;

    const { taskDistribution, taskPriorityLevels } = charts;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.pending || 0 },
      { status: "In Progress", count: taskDistribution?.["in-progress"] || 0 },
      { status: "Completed", count: taskDistribution?.completed || 0 },
    ];
    setPieChartData(taskDistributionData);

    const priorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];
    setBarChartData(priorityLevelData);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASK.GET_USER_DASHBOARD_DATA
      );
      if (response?.data) {
        setDashboardData(response.data);
        console.log("Dashboard Data Fetched:", response.data);
        prepareChartData(response.data?.charts || {});
        setRecentTasks(response.data.recentTasks); // Set the recent tasks
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  const onSeeMore = () => {
    navigate("admin/tasks");
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  useEffect(() => {
    if (dashboardData) {
      console.log("Fetched Dashboard Data:", dashboardData);
    }
  }, [dashboardData]);

  return (
    <div className="flex flex-col gap-4 sm:w-full">
      <div className="flex flex-col gap-4 bg-white shadow-sm px-8 py-6 w-[100%] rounded-lg">
        <div>
          <h1 className="font-medium text-2xl">Hello, {user.name}</h1>
          <p className="text-sm text-gray-400">
            {moment().format("dddd Do MMM YYYY")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <InfoCard
            icon={<IoMdArrowDropright />}
            label="Total Tasks"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="text-blue-500"
          />

          <InfoCard
            icon={<IoMdArrowDropright />}
            label="Pending Tasks"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.pending || 0
            )}
            color="text-red-500"
          />

          <InfoCard
            icon={<IoMdArrowDropright />}
            label="In Progress"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.["in-progress"] || 0
            )}
            color="text-yellow-300"
          />

          <InfoCard
            icon={<IoMdArrowDropright />}
            label="Completed"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.completed || 0
            )}
            color="text-green-500"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-2">
        <div className="flex flex-col justify-between gap-4 bg-white shadow-sm px-8 py-6 w-[100%] rounded-lg">
          <h2 className="font-sm text-lg sm:text-xl">Task Distribution</h2>
          <CustomPieChart data={pieChartData} color={COLORS} />
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="flex flex-col gap-4 bg-white shadow-sm px-8 py-6 w-[100%] rounded-lg">
        <div className="flex justify-between gap-4">
          <h2 className="font-sm text-lg sm:text-2xl">Recent Tasks</h2>
        </div>
        <div>
          {recentTasks?.length > 0 ? (
            <ul>
              {recentTasks.map((task) => (
                <li key={task._id} className="border-b py-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-medium text-sm sm:text-base break-words max-w-[70%]">
                      {task.title}
                    </h3>
                    <span
                      className={`text-sm whitespace-nowrap ${
                        task.status === "completed"
                          ? "text-green-500"
                          : task.status === "pending"
                          ? "text-red-500"
                          : "text-yellow-300"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Due: {moment(task.dueDate).format("MMM Do, YYYY")}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
