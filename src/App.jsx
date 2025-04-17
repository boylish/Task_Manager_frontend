import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Auth Pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

// Protected Route Wrapper
import PrivateRoutes from "./routes/PrivateRoutes";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import CreateTask from "./pages/Admin/CreateTask";
import ManageTasks from "./pages/Admin/ManageTasks";
import ManageUsers from "./pages/Admin/ManageUsers";

// User Pages
import UserDashboard from "./pages/User/UserDashboard";
import MyTasks from "./pages/User/MyTasks";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";

// Context Provider
import UserProvider from "./context/UserContext";

const App = () => {
  return (
    
      <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Protected Routes */}
          <Route element={<PrivateRoutes allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

          {/* User Protected Routes */}
          <Route element={<PrivateRoutes allowedRoles={["user"]} />}>
            <Route path="/user/user-dashboard" element={<UserDashboard />} />
            <Route path="/user/my-task" element={<MyTasks />} />
            <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
          </Route>

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        </UserProvider>
      </Router>
    
  );
};

export default App;