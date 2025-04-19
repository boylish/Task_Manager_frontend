import React, { useState, useEffect } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { IoPeople } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const SelectUsers = ({ selectedUsers = [], setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([...selectedUsers]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
        setAllUsers(response.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setTempSelectedUsers([...selectedUsers]);
  }, [selectedUsers]);

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleConfirmSelection = () => {
    setSelectedUsers([...tempSelectedUsers]);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const clearSelection = () => {
    setSelectedUsers([]);
    setTempSelectedUsers([]);
  };

  const getUserById = (userId) => {
    return allUsers.find(user => user._id === userId);
  };

  return (
    <div className="w-full flex flex-col">
      <button
        onClick={handleOpenModal}
        className="bg-gray-400 flex items-center gap-2 text-white px-4 py-1 rounded-md hover:bg-gray-600 transition-all cursor-pointer"
      >
        <IoPeople className="text-xl" />
        Select Users
      </button>

      {/* Selected users summary */}
      <div className="mt-3">
        {selectedUsers.length > 0 ? (
          <>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Selected Members:</strong> {selectedUsers.length}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedUsers
                .filter((userId, index, self) => self.indexOf(userId) === index)
                .map(userId => {
                  const user = getUserById(userId);
                  if (!user) return null; // Skip unknown users

                  return (
                    <div 
                      key={user._id}
                      className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                    >
                    
                        <FaUserCircle className="text-gray-400 mr-2" />
                     
                      <span className="text-sm">
                        {user?.name || user?.email || "Unknown User"}
                      </span>
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-500 mt-2">No users selected</div>
        )}
      </div>

      {selectedUsers.length > 0 && (
        <button
          onClick={clearSelection}
          className="mt-2 text-sm text-red-500 hover:text-red-700 self-start"
        >
          Clear Selection
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Select Users</h2>

            {isLoading ? (
              <div>Loading users...</div>
            ) : (
              <>
                <div className="max-h-96 overflow-y-auto border rounded-md p-2">
                  {allUsers.map(user => (
                    <div
                      key={user._id}
                      className={`flex items-center p-3 hover:bg-gray-50 rounded-md cursor-pointer ${tempSelectedUsers.includes(user._id) ? 'bg-blue-50' : ''}`}
                      onClick={() => toggleUserSelection(user._id)}
                    >
                      <input
                        type="checkbox"
                        checked={tempSelectedUsers.includes(user._id)}
                        onChange={() => {}}
                        className="h-4 w-4 mr-3"
                      />
                      <div className="flex items-center flex-1">
                        {user.profileImage?.startsWith("http") ? (
                          <img
                            src={user.profileImage}
                            alt="Profile"
                            className="h-10 w-10 rounded-full mr-3"
                          />
                        ) : (
                          <FaUserCircle className="text-3xl text-gray-400 mr-3" />
                        )}
                        <div>
                          <div className="font-medium">{user.name || 'No name'}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-600">
                    {tempSelectedUsers.length} user(s) selected
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 border rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmSelection}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Confirm Selection
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectUsers;
