import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/UserContext";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "",
    adminInviteToken: "",
  });

  const {updateUser} = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
  
    try {
      // Upload image if selected
      if (formData.profileImage) {
        const imgUploadRes = await uploadImage(formData.profileImage);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
  
      // Send data to API with uploaded image URL
      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        ...formData,
        profileImage: profileImageUrl,
      });
  
      const { token, role } = res.data;
  
      if (token) {
        localStorage.setItem("token", token);
        updateUser(res.data);
      //   localStorage.setItem("role", role);
  
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/user-dashboard");
        }
      }
  
      console.log("Signup successful:", formData);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };
  

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto flex flex-col gap-10">
        <div className="flex flex-col">
          <h4 className="text-gray-600">Please fill the form to sign up</h4>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

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

          <div>
            <label className="block mb-1 font-medium">
              Admin Invite Token (optional)
            </label>
            <input
              type="text"
              name="adminInviteToken"
              placeholder="Admin Token (if any)"
              value={formData.adminInviteToken}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
