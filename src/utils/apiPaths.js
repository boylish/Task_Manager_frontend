export const BASE_URL = "https://taskmanagerbackend-seven.vercel.app/";

export const API_PATHS = {
  AUTH: {
    REGISTER: `/api/auth/register`,
    LOGIN: `/api/auth/login`,
    GET_PROFILE: `/api/auth/profile`,
  },
  IMAGE: {
    UPLOAD_IMAGE: `/api/auth/upload-image`,
  },
  USERS: {
    GET_ALL_USERS: `/api/users`,
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`,  // Correct usage of template literal
    CREATE_USER: `/api/users`,
    UPDATE_USER: (userId) => `/api/users/${userId}`,   // Correct usage of template literal
    DELETE_USER: (userId) => `/api/users/${userId}`,   // Correct usage of template literal
  },
  REPORTS: {
    EXPORT_TASKS: `/api/report/export/task`,
    EXPORT_USERS: `/api/report/export/users`,
  },
  TASK: {
    GET_DASHBOARD_DATA: `/api/task/dashboard-data`,
    GET_USER_DASHBOARD_DATA: `/api/task/user-dashboard-data`,
    GET_ALL_TASKS: `/api/task`,
    GET_TASK_BY_ID: (taskId) => `/api/task/${taskId}`,  // Correct usage of template literal
    CREATE_TASK: `/api/task`,
    UPDATE_TASK: (taskId) => `/api/task/${taskId}`,     // Correct usage of template literal
    DELETE_TASK: (taskId) => `/api/task/${taskId}`,     // Correct usage of template literal
    UPDATE_TASK_STATUS: (taskId) => `/api/task/${taskId}/status`,  // Correct usage of template literal
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/task/${taskId}/todo`,  // Correct usage of template literal
  },
};
