import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";
const USERS_API = `${API_BASE}/users`;
const LIKES_API =`${API_BASE}/likes`;

export const findAllLikes = async () => {}

export const createUserLikesRecipe = async (userId, recipeId) => {
    const response = await axios.post(`${USERS_API}/${userId}/likes/${recipeId}`)
}
export const deleteUserLikesRecipe = async (userId, recipeId) => {}

export const findUsersThatLikeRecipe = async (recipeId) => {
    const response = await axios.get(`${LIKES_API}/${recipeId}/users`);
    return response.data;
}
export const findRecipesThatUserLikes = async (userId) => {
    const response = await axios.get(`${USERS_API}/${userId}/likes`);
    return response.data;
}