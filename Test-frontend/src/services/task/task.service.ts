import axios from 'axios';

const apiUrl = 'http://localhost:3000/tasks';

export const getTasks = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const createTask = async (task: any) => {
  const response = await axios.post(apiUrl, task);
  return response.data;
};

export const updateTaskStatus = async (id: string, status: string) => {
  const response = await axios.put(`${apiUrl}/${id}/status`, { status });
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${apiUrl}/${id}`);
  return response.data;
};

export const searchTasks = async (query: string) => {
  const response = await axios.get(`${apiUrl}/search`, { params: { query } });
  return response.data;
};

export const filterTasks = async (filters: any) => {
  const response = await axios.get(`${apiUrl}/filter`, { params: filters });
  return response.data;
};
