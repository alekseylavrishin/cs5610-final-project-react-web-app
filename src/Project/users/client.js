import axios from "axios";

const request = axios.create({
    withCredentials: true,
});

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";
const USERS_API = `${API_BASE}/users`;

export const findAllUsers = async () => {
    const response = await request.get(USERS_API);
    return response.data;
};

export const findUserById = async (id) => {
    const response = await request.get(`${USERS_API}/${id}`);
    return response.data;
};

export const updateUser = async (id, user) => {
    const response = await request.put(`${USERS_API}/${id}`, user);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await request.delete(`${USERS_API}/${id}`);
    return response.data;
}

export const signin = async (credentials) => {
    const response = await request.post(`${USERS_API}/signin`, credentials);
    return response.data;
}

export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
}

export const signout = async () => {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data;

}

export const register = async (credentials) => {
    const response = await request.post(
        `${USERS_API}/register`, credentials);
    return response.data;
};

export const createUser = async (user) => {
    const response = await request.post(`${USERS_API}`, user);
    return response.data;
};