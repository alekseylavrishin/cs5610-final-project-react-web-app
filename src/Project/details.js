import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import * as client from "./client";
import * as likesClient from "./likes/client";
import {useSelector} from "react-redux";
import {FaCircleUser} from "react-icons/fa6";
import * as featuresClient from "./features/client";
import * as nutritionClient from "./nutrition/client";

function Details() {
    const {currentUser} = useSelector((state) => state.userReducer);

    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [likes, setLikes] = useState([]);
    const [error, setError] = useState("");
    const [feature, setFeature] = useState(null);

    const [calories, setCalories] = useState(null);
    const [fat, setFat] = useState(null);
    const [carbohydrates, setCarbs] = useState(null);
    const [protein, setProtein] = useState(null);
    const selectedNutrients = ["Calories", "Fat", "Carbohydrates", "Protein"];
    const [nutrients, setNutrients] = useState({Calories: "", Fat: "", Carbohydrates: "", Protein: ""});

    const fetchRecipe = async () => {
        try {
            const recipe = await client.getRecipeInfo(recipeId);
            setRecipe(recipe);

        }
        catch(error){
        }
    };

    /*const setnutrients = () => {
        setCalories(recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Calories'));
        setFat(recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Fat'));
        setCarbs(recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Carbohydrates'));
        setProtein(recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Protein'));

        setNutrients({
            Calories: `${calories.amount} ${calories.unit}`,
            Fat: `${fat.amount} ${fat.unit}`,
            Carbohydrates: `${carbohydrates.amount} ${carbohydrates.unit}`,
            Protein: `${protein.amount} ${protein.unit}`
        });
    }*/


    const fetchLikes = async () => {
        const likes = await likesClient.findUsersThatLikeRecipe(recipeId);
        setLikes(likes);
    }

    const currentUserLikesRecipe = async () => {
        const _likes = await likesClient.createUserLikesRecipe(currentUser._id, recipeId, recipe.title, recipe.image);


        const cals = recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Calories');
        const fat = recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Fat');
        const carbs = recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Carbohydrates');
        const protein = recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Protein');

        /*setNutrients({
            Calories: `${calories.amount} ${calories.unit}`,
            Fat: `${fat.amount} ${fat.unit}`,
            Carbohydrates: `${carbohydrates.amount} ${carbohydrates.unit}`,
            Protein: `${protein.amount} ${protein.unit}`
        });*/

        /*const nutrition = await nutritionClient.createNutritionInfo(recipeId, recipe.title,
            nutrients.Carbohydrates, nutrients.Fat, nutrients.Calories, nutrients.Protein);*/
        const nutrition = await nutritionClient.createNutritionInfo(recipeId, recipe.title,
            recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Carbohydrates').amount,
            recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Fat').amount,
            recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Calories').amount,
            recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Protein').amount);



        /*setLikes([_likes, ...likes]);
        await fetchLikes();
        alreadyLiked();*/
        fetchLikes();
    };

    const deleteUserLikesRecipe = async () => {
        /*const status = await likesClient.deleteUserLikesRecipe(currentUser._id, recipeId);
        await fetchLikes();
        alreadyLiked();*/
        try {
            const status = await likesClient.deleteUserLikesRecipe(currentUser._id, recipeId);
            // removes liked recipe locally
            let otherUsers = likes.filter(like => like.user._id !== currentUser._id);
            setLikes(otherUsers);
            console.log(otherUsers);

            const removeNutrition = await nutritionClient.deleteNutritionInfo(recipeId);

        }
        catch (error) {
            console.log(error.response.data);
        }
    };

    const alreadyLiked = () => {
        return likes.some((like) => {
            return like.user?._id === currentUser._id;
        })
    }

    const fetchFeature = async () => {
        try {
            const f = await featuresClient.checkIfRecipeFeatured(recipeId);
            setFeature(f);
        }
        catch (error){
            console.log(error.response.data);
        }
    };

    const createFeature = async () => {
        try {
            const status = await featuresClient.createInfluencerFeaturesRecipe(currentUser._id, recipeId, recipe.title, recipe.image)
            //fetchFeature();
            setFeature(status);
        }
        catch (error) {
            console.log(error.response.data);
        }
    };

    const deleteFeature = async () => {
        try {
            const status = await featuresClient.deleteInfluencerFeaturesRecipe(currentUser._id, recipeId);
            //fetchFeature();
            setFeature(null);
        }
        catch (error) {
            console.log(error.response.data);
        }
    };



    /*const calories = recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Calories');
    const fat = recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Fat');
    const carbohydrates = recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Carbohydrates');
    const protein = recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Protein');*/



    useEffect(() => {
        fetchRecipe();
        //fetchUser();
        fetchLikes();
        fetchFeature();
    }, []);

    return(
        <div className={"ms-4 me-4 mt-4 mb-3 row justify-content-center"}>
            {error && <div className={"bg-danger-subtle text-center"}>{error}</div>}


            {recipe &&(
                <div className={"col-10"}>
                    {currentUser && (
                        <>
                            {alreadyLiked() ? (
                                <button onClick={deleteUserLikesRecipe} className={"mb-2 btn btn-light btn-outline-dark float-end"}>
                                    Liked
                                </button>
                            ) : (
                                <button onClick={currentUserLikesRecipe} className={"mb-2 btn btn-light btn-outline-dark float-end"}>
                                    Like
                                </button>
                            )}
                        </>
                    )}
                    {currentUser && currentUser.role === "INFLUENCER" && feature === null && (
                        <button onClick={createFeature} className={"btn btn-outline-primary mb-2"}>
                            Feature
                        </button>
                    )}
                    {currentUser && currentUser.role === "INFLUENCER" && feature !== null && (
                        <button onClick={deleteFeature} className={"btn btn-outline-warning"}>
                            Featured
                        </button>
                    )}
                    <div>
                        <div className={"col-12 d-flex"}>
                            <div className={"col-6 float-start align-self-center ps-1 pe-1"}>
                                <h1 className={"text-capitalize"}>{recipe.title}</h1>
                            </div>

                            <div className={"col-6 float-end align-self-center"}>
                                <img className={"rounded img-fluid"} height={277.5} width={417} src={recipe.image} alt={recipe.name}/>

                            </div>
                        </div>
                        <hr/>
                        <h5><span className={"fw-semibold"}>Total Time</span> {recipe.readyInMinutes} minutes</h5>


                        <div className={"row mb-4 mt-4"}>
                            <div className="mb-3 pt-2 pb-2 pj-recipe-nutrition justify-content-center float-start container d-flex flex-row flex-wrap col-8">
                                <div className={"col-12"}>
                                    <h4 className={"fw-semibold"}>Nutrition Facts:</h4>
                                </div>

                                { recipe.nutrition.nutrients
                                    .filter(nutrient => selectedNutrients.includes(nutrient.name))
                                    .map(({name, amount, unit}) => ({name, amount, unit}))
                                    .map((n, index) => (
                                        <div className={"col-sm-6 col-md-4 col-lg-3 col-8 pj-recipe-nutrition pt-2 pb-2 ps-3 pe-3"}>
                                            <span>{n.name}</span> <br/> <span>{n.amount}{n.unit}</span>
                                        </div>
                                    ))}

                            </div>
                            <hr/>
                        </div>



                        <div className={"mb-4 row"}>
                            <div dangerouslySetInnerHTML={{__html: recipe.summary}}></div>
                            {/*<p>{Recipe.summary}</p>*/}
                        </div>

                        {/*<h3>Ready in {Recipe.readyInMinutes} minutes</h3>*/}
                        <h4 className={"fw-semibold"}>Ingredients:</h4>
                        <ul className={"ms-3"} >
                            {recipe.extendedIngredients.map((ingredient, index) => (
                                <li className={"pj-recipe-li"} key={index}>
                                    <span>{ingredient.original}</span>
                                </li>
                            ))}
                        </ul>
                        <h4 className={"fw-semibold mb-2 mt-3"}>Preparation Instructions:</h4>
                        <ol className={"list-group-numbered"}>
                            {recipe.analyzedInstructions[0].steps.map((step, index) => (
                                <li className={"list-group-item mb-2"} key={index}>
                                    {step.step}
                                </li>
                            ))}
                        </ol>

                        <div className={"row mb-4"}>
                            <hr/>

                            <h4 className={"fw-semibold mb-2 mt-3"}>Liked by</h4>
                            {likes.length === 0 && (
                                <span>No users have liked this recipe yet!</span>
                            )}
                            <ul className={"list-group ms-5 me-5"}>
                                {likes?.map((like, index) => (
                                    <li className={"list-group-item row"}>
                                        <Link className={"pj-navbar-font"} key={index}  to={`/project/users/${like.user?._id}`}>
                                            <div className={"col-1 float-start me-3"}>
                                                <FaCircleUser fontSize={40} className={"ms-2 me-2"}/>
                                            </div>
                                            <div className={"col-5 float-start mt-2 mb-2 ms-md-2 ms-sm-5 ms-3"}>
                                                {like?.user?.username}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                        </div>

                    </div>

                    {/*
                    <pre>{JSON.stringify(Recipe, null, 2)}</pre>
*/}

                </div>
            )}
        </div>
    );
}
export default Details;