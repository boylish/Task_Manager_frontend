import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";



const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const {updateUser} = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });       // aise kaam karta setFormData({ ...formData, email: "user@example.com" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);
      console.log("Login Success:", res.data);

      const { token, role } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(res.data);
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/user-dashboard");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto flex flex-col gap-10">
        <div className="flex flex-col">
          <h2 className="text-3xl font-semibold mb-2">Welcome Back</h2>
          <h4 className="text-gray-600">Please enter your details to log in</h4>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="r mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold ">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
