import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";
const INSTRUCTIONS_API = `${API_BASE}/instructions`;


export const createInstructionInfo = async (recipeId, recipeName, instructions) => {
    const response = await axios.post(`${INSTRUCTIONS_API}/${recipeId}`, {recipeName: recipeName,
        instructions})
    console.log(instructions);

};

export const deleteInstructionInfo = async (recipeId) => {
    const response = await axios.delete(`${INSTRUCTIONS_API}/${recipeId}`)

};

export const getInstructionInfo = async (recipeId) => {
    const response = await axios.get(`${INSTRUCTIONS_API}/${recipeId}`);
    return response.data;
};

export const getAllInstructions = async () => {
    const response = await axios.get(INSTRUCTIONS_API);
    return response.data;
}