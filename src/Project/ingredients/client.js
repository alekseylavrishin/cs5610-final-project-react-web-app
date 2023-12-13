import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";
const INGREDIENTS_API = `${API_BASE}/ingredients`;


export const createIngredientInfo = async (recipeId, recipeName, extendedIngredients) => {
    const response = await axios.post(`${INGREDIENTS_API}/${recipeId}`, {recipeName: recipeName,
        extendedIngredients})
    console.log(extendedIngredients);

};

export const deleteIngredientInfo = async (recipeId) => {
    const response = await axios.delete(`${INGREDIENTS_API}/${recipeId}`)

};

export const getIngredientInfo = async (recipeId) => {
    const response = await axios.get(`${INGREDIENTS_API}/${recipeId}`);
    return response.data;
};

export const getAllIngredients = async () => {
    const response = await axios.get(INGREDIENTS_API);
    return response.data;
}