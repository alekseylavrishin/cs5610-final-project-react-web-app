import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import * as client from "./client";
import * as userClient from "./users/client";
import * as likesClient from "./likes/client";

function Details() {
    const [currentUser ,setCurrentUser] = useState(null);
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [likes, setLikes] = useState([]);

    const fetchUser = async () => {
        try {
            const user = await userClient.account();
            setCurrentUser(user);
        } catch (error){
            setCurrentUser(null);
        }
    }

    const fetchRecipe = async () => {
        const recipe = await client.getRecipeInfo(recipeId);
        setRecipe(recipe);
    };

    const fetchLikes = async () => {
        const likes = await likesClient.findUsersThatLikeRecipe(recipeId);
        setLikes(likes);
    }

    const selectedNutrients = ["Calories", "Fat", "Carbohydrates", "Protein"];

    const currentUserLikesRecipe = async () => {
        const _likes = likesClient.createUserLikesRecipe(currentUser._id, recipeId);
        setLikes([_likes, ...likes]);
    };


    useEffect(() => {
        fetchRecipe();
        fetchUser();
        fetchLikes();
    }, []);

    return(
        <div>
            {recipe &&(
                <div>
                    {currentUser && (
                        <button onClick={currentUserLikesRecipe} className={"btn btn-primary float-end"}>
                            Like
                        </button>
                    )}
                    <h1 className={"text-capitalize"}>{recipe.title}</h1>
                    <p>{recipe.summary}</p>
                    <img src={recipe.image} alt={recipe.name}/>
                    <div className={"row bg-secondary-subtle"}>
                        { recipe.nutrition.nutrients
                            .filter(nutrient => selectedNutrients.includes(nutrient.name))
                            .map(({name, amount, unit}) => ({name, amount, unit}))
                            .map((n, index) => (
                                <div className={"col-sm-3"}>
                                    {n.name} <br/> {n.amount}{n.unit}
                                </div>
                            ))}

                    </div>
                    <h2>Liked by</h2>
                    <ul className={"list-group"}>
                        {likes.map((like, index) => (
                            <li className={"list-group-item"} key={index}>
                                <Link to={`/project/users/${like.user._id}`}>
                                    {like.user.username}
                                </Link>
                            </li>
                            ))}
                    </ul>

                    <h3>Ready in {recipe.readyInMinutes} minutes</h3>
                    <h4>Ingredients:</h4>
                    <ul >
                        {recipe.extendedIngredients.map((ingredient, index) => (
                            <li  key={index}>
                                {ingredient.original}
                            </li>
                        ))}
                    </ul>
                    <h3>Recipe Overview:</h3>
                    <p>{recipe.instructions}</p>
                    <h3>Preparation Instructions:</h3>
                    <ol className={"list-group-numbered"}>
                        {recipe.analyzedInstructions[0].steps.map((step, index) => (
                            <li className={"list-group-item"} key={index}>
                                {step.step}
                            </li>
                        ))}
                    </ol>
                {/*<pre>{JSON.stringify(recipe, null, 2)}</pre>*/}
{/*
                    <pre>{JSON.stringify(recipe.analyzedInstructions[0].steps, null, 2)}</pre>
*/}
                    <pre>{JSON.stringify(recipe.nutrition.nutrients, null, 2)}</pre>
                </div>
                )}
        </div>
    );
}
export default Details;