import "./home.css";
import "../home-img.jpg";
import Logo from "../home-img.jpg";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Button, Modal, Pagination} from "react-bootstrap";
import {useEffect, useState} from "react";
import * as featuresClient from "./features/client";
import * as ingredientsClient from "./ingredients/client";
import * as nutritionClient from "./nutrition/client";
import * as instructionsClient from "./instructions/client";




function Home() {
    const {currentUser} = useSelector((state) => state.userReducer);

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 4;
    const [allFeatures, setAllFeatures] = useState([]);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = allFeatures.slice(indexOfFirstCard, indexOfLastCard);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [show, setShow] = useState(false);
    const [modalIngredients, setModalIngredients] = useState(null);
    const [modalNutrition, setModalNutrition] = useState(null);
    const [modalRecipeId, setModalRecipeId] = useState(null);
    const [modalInstructions, setModalInstructions] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = async (recipeId) =>{
        setModalRecipeId(recipeId); // Set the recipeId before showing the modal
        setShow(true);
        const nutrition = await nutritionClient.getNutritionInfo(recipeId);
        setModalNutrition(nutrition);
        const ingredients = await ingredientsClient.getIngredientInfo(recipeId);
        setModalIngredients(ingredients);
        const instructions = await instructionsClient.getInstructionInfo(recipeId);
        setModalInstructions(instructions);

    }

    const fetchAllFeatures = async () => {
        try {
            const features = await featuresClient.findAllFeatures();
            setAllFeatures(features);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchNutritionalInfo = async (recipeId) => {
        try{
            return await nutritionClient.getNutritionInfo(recipeId);
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchAllFeatures();
    }, []);

    return(
        <div>
            {currentUser && (
                <div className={"row mt-4 col-12"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-8 d-flex"}>
                            <h4>Welcome, {currentUser.username}</h4>
                        </div>
                    </div>
                </div>
            )}
            <div className={"row mt-4 col-12"}>
                <div className={"row justify-content-center mt-4"}>
                    <div className={"col-8 d-flex"}>
                        <div className={"col-6 float-start align-self-center"}>
                            <h1 className={"mb-5"}>Recipe Finder</h1>
                            <h5>Elevate your culinary experience by discovering new and delicious recipes</h5>
                            <Link to={"/project/search"} className={"btn btn-light btn-outline-dark mt-4"}>Get Started</Link>
                        </div>
                        <div className={"col-6 float-end align-self-center"}>
                            <img className={"img-fluid ms-5 me-5 rounded"} height={313} width={395} src={Logo} alt={"Salad Image"}/>
                        </div>

                    </div>
                </div>


                {allFeatures && (
                    <>
                        <div className={"row mt-5 "}>
                            <div className={"col-lg-5 col-md-5 col-sm-6 text-center mt-5"}>
                                <div className={"float-start"}>
                                <h3 className={"ms-5 mt-3 mb-3"}>Featured Recipes ({allFeatures.length})</h3>
                                </div>
                                <div className={"float-start "}>
                                    <Pagination className="mt-3 mt-lg-3 mt-md-1 mt-sm-1 ms-sm-5 ms-md-4 ms-2 me-2 float-start mb-3">
                                        <Pagination.Prev className={"ms-2 me-2"} onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}/>
                                        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(allFeatures.length / cardsPerPage)}/>
                                    </Pagination>
                                </div>

                            </div>
                        </div>
                        <div className="justify-content-center float-start container d-flex flex-row flex-wrap">
                            {currentCards.map((card, index) => (
                                <div>

                                    <div key={index} className="card wd-dashboard-card">
                                        <Link to={`/project/details/${card.recipeId}`} className={"pj-link"} key={index}>

                                        <img src={card.recipeImage} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{card.recipeName}</h5>
                                           {/* <p className="card-text">{card.text}</p>*/}
                                        </div>
                                        </Link>
                                        <Button variant="outline-primary" onClick={() => handleShow(card.recipeId)}>
                                            Quick Look
                                        </Button>
                                    </div>

                                </div>
                            ))}
                        </div>


                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    {modalNutrition?.recipeName}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {modalNutrition &&(
                                <div className={"row mb-4 mt-4  pj-recipe-nutrition justify-content-center"}>
                                    <div className={"col-5 pj-recipe-nutrition pt-2 pb-2 ps-3 pe-3"}>
                                        <span>Calories</span> <br/> <span>{modalNutrition?.calories}g</span>
                                    </div>
                                    <div className={"col-4 pj-recipe-nutrition pt-2 pb-2 ps-3 pe-3"}>
                                        <span>Fat</span> <br/> <span>{modalNutrition?.fat}g</span>
                                    </div>
                                    <div className={"col-5 pj-recipe-nutrition pt-2 pb-2 ps-3 pe-3"}>
                                        <span>Carbohydrates</span> <br/> <span>{modalNutrition?.carbohydrates}kcal</span>
                                    </div>
                                    <div className={"col-4 pj-recipe-nutrition pt-2 pb-2 ps-3 pe-3"}>
                                        <span>Protein</span> <br/> <span>{modalNutrition?.protein}g</span>
                                    </div>
                                </div>
                                )}
                                {!modalNutrition && (<span>Nutrition info missing</span>)}

                                {modalIngredients && (
                                    <>
                                <h4 className={"fw-semibold"}>Ingredients:</h4>
                                <ul className={"ms-3"} >
                                    {modalIngredients?.extendedIngredients.map((ingredient, index) => (
                                        <li className={"pj-recipe-li"} key={index}>
                                            <span>{ingredient.original}</span>
                                        </li>
                                    ))}
                                </ul>
                                </>
                                    )}
                                <div>

                                    <h4 className={"fw-semibold mb-2 mt-3"}>Preparation Instructions:</h4>
                                    <ol className={"list-group-numbered"}>
                                        {modalInstructions?.instructions?.map((instruction, index) => (
                                            <li className={"list-group-item mb-2"} key={index}>
                                                <span>{instruction.step}</span>
                                            </li>
                                        ))}
                                    </ol>

                                </div>


                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    )}
            </div>

        </div>
    );
}
export default Home;
