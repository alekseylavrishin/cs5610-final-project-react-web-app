import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";
const USERS_API = `${API_BASE}/users`;
/*
const LIKES_API =`${API_BASE}/likes`;
*/
const FEATURES_API =`${API_BASE}/features`;

export const findAllFeatures = async () => {
    const response = await axios.get(`${FEATURES_API}`);
    return response.data;
}

export const createInfluencerFeaturesRecipe = async (userId, recipeId, recipeName, recipeImage) => {
    const response = await axios.post(`${USERS_API}/${userId}/features/${recipeId}`, {recipeName: recipeName, recipeImage: recipeImage})
    console.log("recipe featured " + recipeName);
}

export const deleteInfluencerFeaturesRecipe = async (userId, recipeId) => {
    const response = await axios.delete(`${USERS_API}/${userId}/features/${recipeId}`)
}

/*export const findUsersThatLikeRecipe = async (recipeId) => {
    const response = await axios.get(`${LIKES_API}/${recipeId}/users`);
    return response.data;
}*/

export const checkIfRecipeFeatured = async (recipeId) => {
    const response = await axios.get(`${FEATURES_API}/${recipeId}`)
    return response.data;
}

export const findRecipesThatInfluencerFeatures = async (userId) => {
    const response = await axios.get(`${USERS_API}/${userId}/features`);
    return response.data;
}