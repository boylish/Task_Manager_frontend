import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths"; // Make sure this points to '/auth/profile'

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data); // ✅ assuming response.data contains user info
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          console.error("Invalid token. Removing it.");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          console.error("Error fetching user:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Login or update user
  const updateUser = (userData) => {
    setUser(userData.user || userData); // Support { user, token } or just user
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
    setLoading(false);
  };

  // ✅ Logout
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserProvider;
