import axios from "axios";

export const SPOONACULAR_API = "https://api.spoonacular.com/recipes";
export const API_KEY = process.env.REACT_APP_API_KEY;

export const findRecipes = async (searchTerm) => {
    const response = await axios.get(
        `${SPOONACULAR_API}/complexSearch?apiKey=${API_KEY}&query=${searchTerm}&number=50`
    );
    return response.data;
}

export const getRecipeInfo = async (recipeId) => {
    const response = await axios.get(
        `${SPOONACULAR_API}/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`
    );
    return response.data;
}