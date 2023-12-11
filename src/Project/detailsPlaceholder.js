import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import * as client from "./client";
import * as likesClient from "./likes/client";
import * as featuresClient from "./features/client";
import {useSelector} from "react-redux";
import "./home.css";
import {FaCircleUser} from "react-icons/fa6";

// This file is used to decorate /project/search/details
// without sending requests to the remote API
function DetailsPH() {
    const {currentUser} = useSelector((state) => state.userReducer);

    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [likes, setLikes] = useState([]);
    const [error, setError] = useState("");
    const [feature, setFeature] = useState(null);


    /*const fetchRecipe = async () => {
        try {
            const recipe = await client.getRecipeInfo(631894);
            setRecipe(recipe);
        }
        catch(error){
            setError(error.response.data.message)
        }
    };*/

    const fetchLikes = async () => {
        const likes = await likesClient.findUsersThatLikeRecipe(631894);
        setLikes(likes);
    }

    const selectedNutrients = ["Calories", "Fat", "Carbohydrates", "Protein"];

    const currentUserLikesRecipe = async () => {
        const _likes = await likesClient.createUserLikesRecipe(currentUser._id, 631894, Recipe.title, Recipe.image);

        //setLikes([_likes, ...likes]);
        //setLikes([userPlaceholder, ...likes]);
        console.log(likes);
        fetchLikes();

    };

    const deleteUserLikesRecipe = async () => {
        try {
            const status = await likesClient.deleteUserLikesRecipe(currentUser._id, 631894);
            // removes liked recipe locally
            let otherUsers = likes.filter(like => like.user._id !== currentUser._id);
            setLikes(otherUsers);
            console.log(otherUsers);
        }
        catch (error) {
            console.log(error.response.data);
        }
    };

    const alreadyLiked = () => {
        //fetchLikes();
        return likes.some((like) => {
            return like.user?._id === currentUser._id;
        })
    };

    const fetchFeature = async () => {
        try {
            const f = await featuresClient.checkIfRecipeFeatured(631894);
            setFeature(f);
        }
        catch (error){
            console.log(error.response.data);
        }
    };

    const createFeature = async () => {
        try {
            const status = await featuresClient.createInfluencerFeaturesRecipe(currentUser._id, 631894, Recipe.title, Recipe.image)
            //fetchFeature();
            setFeature(status);
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    const deleteFeature = async () => {
        try {
            const status = await featuresClient.deleteInfluencerFeaturesRecipe(currentUser._id, 631894);
            //fetchFeature();
            setFeature(null);
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    const Recipe = {
        summary: "A Fish That's Not Really A Fish is a <b>pescatarian</b> recipe with 6 servings. For <b>$2.54 per serving</b>, this recipe <b>covers 33%</b> of your daily requirements of vitamins and minerals. One portion of this dish contains roughly <b>41g of protein</b>, <b>38g of fat</b>, and a total of <b>850 calories</b>. It is brought to you by Foodista. A mixture of shallots, capers, little' patience and creativity, and a handful of other ingredients are all it takes to make this recipe so yummy. It works well as a main course. 1 person were glad they tried this recipe. From preparation to the plate, this recipe takes about <b>45 minutes</b>. With a spoonacular <b>score of 70%</b>, this dish is good. <a href=\"https://spoonacular.com/recipes/easy-fish-molee-south-indian-style-fish-stew-with-coconut-1632337\">Easy Fish Molee (South Indian-Style Fish Stew With Coconut)</a>, <a href=\"https://spoonacular.com/recipes/easy-fish-molee-south-indian-style-fish-stew-with-coconut-641970\">Easy Fish Molee (South Indian-Style Fish Stew With Coconut)</a>, and <a href=\"https://spoonacular.com/recipes/turbot-fish-in-tomato-sauce-breaded-fish-1434\">Turbot Fish in Tomato Sauce (Breaded Fish )</a> are very similar to this recipe.",
        title: "A Fish That's Not Really A Fish",
        image: "https://spoonacular.com/recipeImages/631894-556x370.jpg",
        name: "name",
        readyInMinutes: 45,
        nutrition: {
            nutrients: [
                {
                    name: "Calories",
                    amount: 849.84,
                    unit: "kcal",
                    percentOfDailyNeeds: 42.49
                },
                {
                    name: "Fat",
                    amount: 37.98,
                    unit: "g",
                    percentOfDailyNeeds: 58.42
                },
                {
                    name: "Carbohydrates",
                    amount: 84.65,
                    unit: "g",
                    percentOfDailyNeeds: 28.22
                },
                {
                    name: "Protein",
                    amount: 40.74,
                    unit: "g",
                    percentOfDailyNeeds: 81.47
                },

            ],
        },

        extendedIngredients: [
            {
                id: 2004,
                aisle: "Spices and Seasonings",
                image: "bay-leaves.jpg",
                consistency: "SOLID",
                name: "bay leaf",
                nameClean: "bay leaves",
                original: "1 bay leaf",
                originalName: "bay leaf",
                amount: 1,
                unit: "",
                meta: [],
                measures: {
                    us: {
                        amount: 1,
                        unitShort: "",
                        unitLong: ""
                    },
                    metric: {
                        amount: 1,
                        unitShort: "",
                        unitLong: ""
                    }
                }
            },
            {
                id: 1059195,
                aisle: "Canned and Jarred",
                image: "black-olives.jpg",
                consistency: "SOLID",
                name: "olives",
                nameClean: "black olives",
                original: "2 tablespoons pitted black olives",
                originalName: "pitted black olives",
                amount: 2,
                unit: "tablespoons",
                meta: [
                    "black",
                    "pitted"
                ],
                measures: {
                    us: {
                        amount: 2,
                        unitShort: "Tbsps",
                        unitLong: "Tbsps"
                    },
                    metric: {
                        amount: 2,
                        unitShort: "Tbsps",
                        unitLong: "Tbsps"
                    }
                }
            },
            {
                id: 1001,
                aisle: "Milk, Eggs, Other Dairy",
                image: "butter-sliced.jpg",
                consistency: "SOLID",
                name: "butter",
                nameClean: "butter",
                original: "1 knob of butter",
                originalName: "butter",
                amount: 1,
                unit: "knob",
                meta: [],
                measures: {
                    us: {
                        amount: 1,
                        unitShort: "knob",
                        unitLong: "knob"
                    },
                    metric: {
                        amount: 1,
                        unitShort: "knob",
                        unitLong: "knob"
                    }
                }
            },
            {
                id: 2054,
                aisle: "Canned and Jarred",
                image: "capers.jpg",
                consistency: "SOLID",
                name: "capers",
                nameClean: "capers",
                original: "1 tablespoon capers",
                originalName: "capers",
                amount: 1,
                unit: "tablespoon",
                meta: [],
                measures: {
                    us: {
                        amount: 1,
                        unitShort: "Tbsp",
                        unitLong: "Tbsp"
                    },
                    metric: {
                        amount: 1,
                        unitShort: "Tbsp",
                        unitLong: "Tbsp"
                    }
                }
            },
            {
                id: 15015,
                aisle: "Seafood",
                image: "cod-fillet.jpg",
                consistency: "SOLID",
                name: "cod",
                nameClean: "cod fillets",
                original: "200 grams fresh cod",
                originalName: "fresh cod",
                amount: 200,
                unit: "grams",
                meta: [
                    "fresh"
                ],
                measures: {
                    us: {
                        amount: 7.055,
                        unitShort: "oz",
                        unitLong: "ounces"
                    },
                    metric: {
                        amount: 200,
                        unitShort: "g",
                        unitLong: "grams"
                    }
                }
            },
            {
                id: 1125,
                aisle: "Milk, Eggs, Other Dairy",
                image: "egg-yolk.jpg",
                consistency: "SOLID",
                name: "egg yolk",
                nameClean: "egg yolk",
                original: "1 egg yolk",
                originalName: "egg yolk",
                amount: 1,
                unit: "",
                meta: [],
                measures: {
                    us: {
                        amount: 1,
                        unitShort: "",
                        unitLong: ""
                    },
                    metric: {
                        amount: 1,
                        unitShort: "",
                        unitLong: ""
                    }
                }
            },
            {
                id: 20081,
                aisle: "Baking",
                image: "flour.png",
                consistency: "SOLID",
                name: "flour",
                nameClean: "wheat flour",
                original: "2 cups all-purpose flour",
                originalName: "all-purpose flour",
                amount: 2,
                unit: "cups",
                meta: [
                    "all-purpose"
                ],
                measures: {
                    us: {
                        amount: 2,
                        unitShort: "cups",
                        unitLong: "cups"
                    },
                    metric: {
                        amount: 250,
                        unitShort: "g",
                        unitLong: "grams"
                    }
                }
            },
                {
                    id: 1077,
                    aisle: "Milk, Eggs, Other Dairy",
                    image: "milk.png",
                    consistency: "LIQUID",
                    name: "milk",
                    nameClean: "milk",
                    original: "1 cup milk",
                    originalName: "milk",
                    amount: 1,
                    unit: "cup",
                    meta: [],
                    measures: {
                        us: {
                            amount: 1,
                            unitShort: "cup",
                            unitLong: "cup"
                        },
                        metric: {
                            amount: 244,
                            unitShort: "ml",
                            unitLong: "milliliters"
                        }
                    }
                },
                {
                    id: 11297,
                    aisle: "Spices and Seasonings",
                    image: "parsley.jpg",
                    consistency: "SOLID",
                    name: "parsley",
                    nameClean: "parsley",
                    original: "2 tablespoons chopped parsley",
                    originalName: "chopped parsley",
                    amount: 2,
                    unit: "tablespoons",
                    meta: [
                        "chopped"
                    ],
                    measures: {
                        us: {
                            amount: 2,
                            unitShort: "Tbsps",
                            unitLong: "Tbsps"
                        },
                        metric: {
                            amount: 2,
                            unitShort: "Tbsps",
                            unitLong: "Tbsps"
                        }
                    }
                },
                {
                    id: 11352,
                    aisle: "Produce",
                    image: "potatoes-yukon-gold.png",
                    consistency: "SOLID",
                    name: "potatoes",
                    nameClean: "potato",
                    original: "400 grams peeled potatoes",
                    originalName: "peeled potatoes",
                    amount: 400,
                    unit: "grams",
                    meta: [
                        "peeled"
                    ],
                    measures: {
                        us: {
                            amount: 14.11,
                            unitShort: "oz",
                            unitLong: "ounces"
                        },
                        metric: {
                            amount: 400,
                            unitShort: "g",
                            unitLong: "grams"
                        }
                    }
                },
                {
                    id: 18337,
                    aisle: "Refrigerated",
                    image: "puff-pastry.png",
                    consistency: "SOLID",
                    name: "puff pastry",
                    nameClean: "puff pastry dough",
                    original: "2 sheets of puff pastry",
                    originalName: "puff pastry",
                    amount: 2,
                    unit: "sheets",
                    meta: [],
                    measures: {
                        us: {
                            amount: 2,
                            unitShort: "sheets",
                            unitLong: "sheets"
                        },
                        metric: {
                            amount: 2,
                            unitShort: "sheets",
                            unitLong: "sheets"
                        }
                    }
                },
                {
                    id: 15018,
                    aisle: "Seafood",
                    image: "cod-fillet.jpg",
                    consistency: "SOLID",
                    name: "salt cod soaked",
                    nameClean: "salt cod",
                    original: "200 grams salt cod soaked",
                    originalName: "salt cod soaked",
                    amount: 200,
                    unit: "grams",
                    meta: [],
                    measures: {
                        us: {
                            amount: 7.055,
                            unitShort: "oz",
                            unitLong: "ounces"
                        },
                        metric: {
                            amount: 200,
                            unitShort: "g",
                            unitLong: "grams"
                        }
                    }
                },
                {
                    id: 11677,
                    aisle: "Produce",
                    image: "shallots.jpg",
                    consistency: "SOLID",
                    name: "shallots",
                    nameClean: "shallot",
                    original: "3 shallots",
                    originalName: "shallots",
                    amount: 3,
                    unit: "",
                    meta: [],
                    measures: {
                        us: {
                            amount: 3,
                            unitShort: "",
                            unitLong: ""
                        },
                        metric: {
                            amount: 3,
                            unitShort: "",
                            unitLong: ""
                        }
                    }
                },
                {
                    id: -1,
                    aisle: "?",
                    image: null,
                    consistency: "SOLID",
                    name: "a little' patience and creativity",
                    nameClean: null,
                    original: "a little' patience and creativity!",
                    originalName: "a little' patience and creativity",
                    amount: 6,
                    unit: "servings",
                    meta: [],
                    measures: {
                        us: {
                            amount: 6,
                            unitShort: "servings",
                            unitLong: "servings"
                        },
                        metric: {
                            amount: 6,
                            unitShort: "servings",
                            unitLong: "servings"
                        }
                    }
                },
                {
                    id: -1,
                    aisle: "?",
                    image: null,
                    consistency: "SOLID",
                    name: "little' patience and creativity",
                    nameClean: null,
                    original: "a little' patience and creativity!",
                    originalName: "a little' patience and creativity",
                    amount: 6,
                    unit: "servings",
                    meta: [],
                    measures: {
                        us: {
                            amount: 6,
                            unitShort: "servings",
                            unitLong: "servings"
                        },
                        metric: {
                            amount: 6,
                            unitShort: "servings",
                            unitLong: "servings"
                        }
                    }
                }
            ],
            instructions: "<ol><li>Simmer the fish and potatoes in salted water, with the bay leaf and cloves. Chop the capers and olives. With a slotted spoon, remove the fish when still slightly undercooked, definitely before it begins to fall apart! Transfer to a bowl, remove skin and bones and flake into large pieces. When soft, drain and mash the potatoes, then add to the fish together with the olives, capers and parsley.</li><li>Meanwhile, slice the shallots and simmer them in the milk. Drain, adding the shallots to the mixture and reserving the liquid. Use the latter to make 3-4 tablespoons of bechamel sauce, which you will also incorporate into the fish mixture. Mix gently to avoid breaking up the fish and check for salt.Allow to cool.</li><li>Roll out a sheet of puff pastry on a baking sheet. Place the mixture in the center in an oval shape (the body of your 'fish'). Cover with another sheet of pastry and press the edges to seal (brush them with a bit of water so that they stick better). Refrigerate for 20 minutes.</li><li>Remove from the fridge, cut the pastry in the shape of your fish, after which brush the surface with the egg yolk beaten with a little milk.</li><li>With the tip of a knife draw the fish scales, the eye and any other detail, according to your imagination. The nicks are to be superficial and not go through the pastry. Bake in a preheated oven at 200C for about 25 minutes or until the fish is nicely colored.P.s. if you wish, and have even more time and patience, you can make lots of individual small fishes, perhaps in different shapes.</li></ol>",
            analyzedInstructions: [
                {
                    name: "",
                    steps: [
                        {
                            number: 1,
                            step: "Simmer the fish and potatoes in salted water, with the bay leaf and cloves. Chop the capers and olives. With a slotted spoon, remove the fish when still slightly undercooked, definitely before it begins to fall apart!",
                            ingredients: [
                                {
                                    id: 2004,
                                    name: "bay leaves",
                                    localizedName: "bay leaves",
                                    image: "bay-leaves.jpg"
                                },
                                {
                                    id: 11352,
                                    name: "potato",
                                    localizedName: "potato",
                                    image: "potatoes-yukon-gold.png"
                                },
                                {
                                    id: 2054,
                                    name: "capers",
                                    localizedName: "capers",
                                    image: "capers.jpg"
                                },
                                {
                                    id: 1002011,
                                    name: "clove",
                                    localizedName: "clove",
                                    image: "cloves.jpg"
                                },
                                {
                                    id: 9195,
                                    name: "olives",
                                    localizedName: "olives",
                                    image: "olives-mixed.jpg"
                                },
                                {
                                    id: 14412,
                                    name: "water",
                                    localizedName: "water",
                                    image: "water.png"
                                },
                                {
                                    id: 10115261,
                                    name: "fish",
                                    localizedName: "fish",
                                    image: "fish-fillet.jpg"
                                }
                            ],
                            equipment: [
                                {
                                    id: 404636,
                                    name: "slotted spoon",
                                    localizedName: "slotted spoon",
                                    image: "slotted-spoon.jpg"
                                }
                            ]
                        },
                        {
                            number: 2,
                            step: "Transfer to a bowl, remove skin and bones and flake into large pieces. When soft, drain and mash the potatoes, then add to the fish together with the olives, capers and parsley.Meanwhile, slice the shallots and simmer them in the milk.",
                            ingredients: [
                                {
                                    id: 11352,
                                    name: "potato",
                                    localizedName: "potato",
                                    image: "potatoes-yukon-gold.png"
                                },
                                {
                                    id: 11677,
                                    name: "shallot",
                                    localizedName: "shallot",
                                    image: "shallots.jpg"
                                },
                                {
                                    id: 11297,
                                    name: "parsley",
                                    localizedName: "parsley",
                                    image: "parsley.jpg"
                                },
                                {
                                    id: 2054,
                                    name: "capers",
                                    localizedName: "capers",
                                    image: "capers.jpg"
                                },
                                {
                                    id: 9195,
                                    name: "olives",
                                    localizedName: "olives",
                                    image: "olives-mixed.jpg"
                                },
                                {
                                    id: 10115261,
                                    name: "fish",
                                    localizedName: "fish",
                                    image: "fish-fillet.jpg"
                                },
                                {
                                    id: 1077,
                                    name: "milk",
                                    localizedName: "milk",
                                    image: "milk.png"
                                }
                            ],
                            equipment: [
                                {
                                    id: 404783,
                                    name: "bowl",
                                    localizedName: "bowl",
                                    image: "bowl.jpg"
                                }
                            ]
                        },
                        {
                            number: 3,
                            step: "Drain, adding the shallots to the mixture and reserving the liquid. Use the latter to make 3-4 tablespoons of bechamel sauce, which you will also incorporate into the fish mixture.",
                            ingredients: [
                                {
                                    id: 11677,
                                    name: "shallot",
                                    localizedName: "shallot",
                                    image: "shallots.jpg"
                                },
                                {
                                    id: 0,
                                    name: "sauce",
                                    localizedName: "sauce",
                                    image: ""
                                },
                                {
                                    id: 10115261,
                                    name: "fish",
                                    localizedName: "fish",
                                    image: "fish-fillet.jpg"
                                }
                            ],
                            equipment: []
                        },
                        {
                            number: 4,
                            step: "Mix gently to avoid breaking up the fish and check for salt.Allow to cool.",
                            ingredients: [
                                {
                                    id: 10115261,
                                    name: "fish",
                                    localizedName: "fish",
                                    image: "fish-fillet.jpg"
                                },
                                {
                                    id: 2047,
                                    name: "salt",
                                    localizedName: "salt",
                                    image: "salt.jpg"
                                }
                            ],
                            equipment: []
                        },
                        {
                            number: 5,
                            step: "Roll out a sheet of puff pastry on a baking sheet.",
                            ingredients: [
                                {
                                    id: 18337,
                                    name: "puff pastry sheets",
                                    localizedName: "puff pastry sheets",
                                    image: "puff-pastry.png"
                                },
                                {
                                    id: 0,
                                    name: "roll",
                                    localizedName: "roll",
                                    image: "dinner-yeast-rolls.jpg"
                                }
                            ],
                            equipment: [
                                {
                                    id: 404727,
                                    name: "baking sheet",
                                    localizedName: "baking sheet",
                                    image: "baking-sheet.jpg"
                                }
                            ]
                        },
                        {
                            number: 6,
                            step: "Place the mixture in the center in an oval shape (the body of your 'fish'). Cover with another sheet of pastry and press the edges to seal (brush them with a bit of water so that they stick better). Refrigerate for 20 minutes.",
                            ingredients: [
                                {
                                    id: 14412,
                                    name: "water",
                                    localizedName: "water",
                                    image: "water.png"
                                },
                                {
                                    id: 10115261,
                                    name: "fish",
                                    localizedName: "fish",
                                    image: "fish-fillet.jpg"
                                }
                            ],
                            equipment: [],
                            length: {
                                number: 20,
                                unit: "minutes"
                            }
                        },
                        {
                            number: 7,
                            step: "Remove from the fridge, cut the pastry in the shape of your fish, after which brush the surface with the egg yolk beaten with a little milk.With the tip of a knife draw the fish scales, the eye and any other detail, according to your imagination. The nicks are to be superficial and not go through the pastry.",
                            ingredients: [
                                {
                                    id: 1125,
                                    name: "egg yolk",
                                    localizedName: "egg yolk",
                                    image: "egg-yolk.jpg"
                                },
                                {
                                    id: 10115261,
                                    name: "fish",
                                    localizedName: "fish",
                                    image: "fish-fillet.jpg"
                                },
                                {
                                    id: 1077,
                                    name: "milk",
                                    localizedName: "milk",
                                    image: "milk.png"
                                }
                            ],
                            equipment: [
                                {
                                    id: 404745,
                                    name: "knife",
                                    localizedName: "knife",
                                    image: "chefs-knife.jpg"
                                }
                            ]
                        },
                        {
                            number: 8,
                            step: "Bake in a preheated oven at 200C for about 25 minutes or until the fish is nicely colored.P.s. if you wish, and have even more time and patience, you can make lots of individual small fishes, perhaps in different shapes.",
                            ingredients: [
                                {
                                    id: 10115261,
                                    name: "fish",
                                    localizedName: "fish",
                                    image: "fish-fillet.jpg"
                                }
                            ],
                            equipment: [
                                {
                                    id: 404784,
                                    name: "oven",
                                    localizedName: "oven",
                                    image: "oven.jpg",
                                    temperature: {
                                        number: 200,
                                        unit: "Celsius"
                                    }
                                }
                            ],
                            length: {
                                number: 25,
                                unit: "minutes"
                            }
                        }
                    ]
                }

],


    };


    useEffect(() => {
        //fetchRecipe();
        //fetchUser();
        fetchLikes();
        fetchFeature();
       /* alreadyLiked();*/
    }, []);

    return(
        <div className={"ms-4 me-4 mt-4 mb-3 row justify-content-center"}>
            {error && <div className={"bg-danger-subtle text-center"}>{error}</div>}


            {Recipe &&(
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
                                <h1 className={"text-capitalize"}>{Recipe.title}</h1>
                            </div>

                            <div className={"col-6 float-end align-self-center"}>
                                <img className={"rounded img-fluid"} height={277.5} width={417} src={Recipe.image} alt={Recipe.name}/>

                            </div>
                        </div>
                        <hr/>
                        <h5><span className={"fw-semibold"}>Total Time</span> {Recipe.readyInMinutes} minutes</h5>


                        <div className={"row mb-4 mt-4"}>
                            <div className="mb-3 pt-2 pb-2 pj-recipe-nutrition justify-content-center float-start container d-flex flex-row flex-wrap col-8">
                            <div className={"col-12"}>
                                <h4 className={"fw-semibold"}>Nutrition Facts:</h4>
                            </div>

                                { Recipe.nutrition.nutrients
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
                        <div className={"black-font"} dangerouslySetInnerHTML={{__html: Recipe.summary}}></div>
                        {/*<p>{Recipe.summary}</p>*/}
                    </div>

                    {/*<h3>Ready in {Recipe.readyInMinutes} minutes</h3>*/}
                    <h4 className={"fw-semibold"}>Ingredients:</h4>
                    <ul className={"ms-3"} >
                        {Recipe.extendedIngredients.map((ingredient, index) => (
                            <li className={"pj-recipe-li"} key={index}>
                                <span>{ingredient.original}</span>
                            </li>
                        ))}
                    </ul>
                    <h4 className={"fw-semibold mb-2 mt-3"}>Preparation Instructions:</h4>
                    <ol className={"list-group-numbered"}>
                        {Recipe.analyzedInstructions[0].steps.map((step, index) => (
                            <li className={"list-group-item mb-2"} key={index}>
                                {step.step}
                            </li>
                        ))}
                    </ol>

                     <div className={"row mb-4"}>
                         <hr/>

                         <h4 className={"fw-semibold mb-3 mt-3"}>Liked by</h4>
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
export default DetailsPH;