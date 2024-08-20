import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const fetchTaskLists = () => api.get('/tasklists/');
export const fetchTasks = (taskListId) => api.get(`/tasklists/${taskListId}/tasks/`);
export const createTaskList = (data) => api.post('/tasklists/', data);
export const createTask = (taskListId, data) => api.post(`/tasklists/${taskListId}/tasks/`, data);
export const updateTask = (taskListId, id, data) => api.put(`/tasklists/${taskListId}/tasks/${id}/`, data);
export const deleteTask = (taskListId, id) => api.delete(`/tasklists/${taskListId}/tasks/${id}/`);
export const deleteTaskList = (taskListId) => api.delete(`/tasklists/${taskListId}/`);
export const markTaskComplete = (taskListId, taskId) => api.post(`/tasklists/${taskListId}/tasks/${taskId}/mark_complete/`);
export const markTaskIncomplete = (taskListId, taskId) => api.post(`/tasklists/${taskListId}/tasks/${taskId}/mark_incomplete/`);