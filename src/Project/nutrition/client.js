import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";
const NUTRITION_API = `${API_BASE}/nutrition`;


export const createNutritionInfo = async (recipeId, recipeName, carbohydrates, fat, calories, protein) => {
    const response = await axios.post(`${NUTRITION_API}/${recipeId}`, {recipeName: recipeName,
        carbohydrates, fat, calories, protein})

};

export const deleteNutritionInfo = async (recipeId) => {
    const response = await axios.delete(`${NUTRITION_API}/${recipeId}`)

};

export const getNutritionInfo = async (recipeId) => {
    const response = await axios.get(`${NUTRITION_API}/${recipeId}`);
    return response.data;
};

export const getAllNutrition = async () => {
    const response = await axios.get(NUTRITION_API);
    return response.data;
}