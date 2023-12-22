import { BackendUrl } from "../helper";
import { TaskType, UserType } from "../types";
import axios from "axios";

export const handleSignUpApi = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${BackendUrl}/user/signup`, { username, email, password });
  return response.data;
};

export const handleLoginApi = async (email: string, password: string) => {
  const response = await axios.post(`${BackendUrl}/user/login`, { email, password });
  return response.data;
};

export const fetchTasksApi = async (user: UserType) => {
  const response = await axios.get(`${BackendUrl}/task`, { headers: { Authorization: `Bearer ${user.token}` } });
  console.log("res.data: ", response.data);
  return response.data.tasks as Array<TaskType>;
};

export const handleAddTaskApi = async (user: UserType, title: string, description: string) => {
  const response = await axios.post(
    `${BackendUrl}/task`,
    { title: title, description: description },
    { headers: { Authorization: `Bearer ${user.token}` } }
  );
  return response.data;
};

export const handleDeleteTaskApi = async (user: UserType, taskId: string) => {
  const response = await axios.delete(`${BackendUrl}/task/${taskId}`, { headers: { Authorization: `Bearer ${user.token}` } });
  return response.data;
};
