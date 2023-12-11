import "./home.css";
import "../home-img.jpg";
import Logo from "../home-img.jpg";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Pagination} from "react-bootstrap";
import {useEffect, useState} from "react";
import * as featuresClient from "./features/client";


function Home() {
    const {currentUser} = useSelector((state) => state.userReducer);

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 4;
    const [allFeatures, setAllFeatures] = useState([]);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = allFeatures.slice(indexOfFirstCard, indexOfLastCard);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const fetchAllFeatures = async () => {
        const features = await featuresClient.findAllFeatures();
        setAllFeatures(features);
    }

    useEffect(() => {
        fetchAllFeatures();
    }, []);

    return(
        <div>
            {currentUser && (
                <div className={"row mt-4"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-8 d-flex"}>
                            <h4>Welcome, {currentUser.username}</h4>
                        </div>
                    </div>
                </div>
            )}
            <div className={"row mt-4"}>
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
                        <Link to={`/project/details/${card.recipeId}`}>
                        <div key={index} className="card wd-dashboard-card">
                            <img src={card.recipeImage} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{card.recipeName}</h5>
                               {/* <p className="card-text">{card.text}</p>*/}
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}
export default Home;
