export const BASE_URL = "https://my-task-manager-eta.vercel.app";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },
  IMAGE: {
    UPLOAD_IMAGE: "api/auth/upload-image",
  },
  USERS: {
    GET_ALL_USERS: "/api/users",
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`,
    CREATE_USER: "/api/users",
    UPDATE_USER: (userId) => `/api/users/${userId}`,
    DELETE_USER: (userId) => `/api/users/${userId}`,
  },
  REPORTS: {
    EXPORT_TASKS: "/api/report/export/task",
    EXPORT_USERS: "/api/report/export/users",
  },
  TASK: {
    GET_DASHBOARD_DATA: "/api/task/dashboard-data",
    GET_USER_DASHBOARD_DATA: "/api/task/user-dashboard-data",
    GET_ALL_TASKS: "/api/task",
    GET_TASK_BY_ID: (taskId) => `/api/task/${taskId}`,
    CREATE_TASK: "/api/task",
    UPDATE_TASK: (taskId) => `/api/task/${taskId}`,
    DELETE_TASK: (taskId) => `/api/task/${taskId}`,

    UPDATE_TASK_STATUS: (taskId) => `/api/task/${taskId}/status`,
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/task/${taskId}/todo`,
  },
};
