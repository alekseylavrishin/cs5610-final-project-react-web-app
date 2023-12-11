import axios from "axios";

const client = axios.create({
    withCredentials: true,
    //baseURL: process.env.REACT_APP_API_URL
    //baseURL: "http://localhost:4000/api/users"
    //baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/api/users"
});
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api/users";


export const userFollowsUser = async (followed) => {
    const response = await client.post(`${API_URL}/${followed}/follows`);
    return response.data;
};

export const userUnfollowsUser = async (followed) => {
    const response = await client.delete(`${API_URL}/${followed}/follows`);
    return response.data;
};

export const findFollowersOfUser = async (followed) => {
    const response = await client.get(`${API_URL}/${followed}/followers`);
    return response.data;
};

export const findFollowedUsersByUser = async (follower) => {
    const response = await client.get(`${API_URL}/${follower}/following`);
    return response.data;
};
