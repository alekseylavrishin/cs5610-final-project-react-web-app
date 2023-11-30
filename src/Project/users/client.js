import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";
const USERS_API = `${API_BASE}/users`;

export const findAllUsers = async () => {
    const response = await axios.get(USERS_API);
    return response.data;
};

export const findUserById = async (id) => {
    const response = await axios.get(`${USERS_API}/${id}`);
    return response.data;
};

export const updateUser = async (id, user) => {
    const response = await axios.put(`${USERS_API}/${id}`, user);
    return response.data;
};