import "./home.css";
import "../home-img.jpg";
import Logo from "../home-img.jpg";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function Home() {
    const {currentUser} = useSelector((state) => state.userReducer);

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
                        <div className={"col-6 float-end"}>
                            <img className={"ms-5 me-5"} height={313} width={395} src={Logo} alt={"Salad Image"}/>
                        </div>

                    </div>
                </div>


                <div className={"row mt-5 "}>
                    <div className={"col-lg-4 col-md-5 col-sm-6 text-center mt-5"}>
                        <h2 className={"ms-5 mt-4"}>Featured Recipes</h2>
                    </div>
                </div>
                    <div className="justify-content-center float-start container d-flex flex-row flex-wrap">

                        <div className="card wd-dashboard-card">
                            <img src="https://spoonacular.com/recipeImages/654928-556x370.jpg"
                                 className="card-img-top" alt="..."/>
                            <div className={"card-body"}>
                                <h5 className={"card-title"}>Card Title</h5>
                                <p className={"card-text"}>Card Text</p>
                            </div>
                        </div>
                        <div className="card wd-dashboard-card">
                            <img src="https://spoonacular.com/recipeImages/654928-556x370.jpg"
                                 className="card-img-top" alt="..."/>
                            <div className={"card-body"}>
                                <h5 className={"card-title"}>Card Title</h5>
                                <p className={"card-text"}>Card Text</p>
                            </div>
                        </div>
                        <div className="card wd-dashboard-card">
                            <img src="https://spoonacular.com/recipeImages/654928-556x370.jpg"
                                 className="card-img-top" alt="..."/>
                            <div className={"card-body"}>
                                <h5 className={"card-title"}>Card Title</h5>
                                <p className={"card-text"}>Card Text</p>
                            </div>
                        </div>
                        <div className="card wd-dashboard-card">
                            <img src="https://spoonacular.com/recipeImages/654928-556x370.jpg"
                                 className="card-img-top" alt="..."/>
                            <div className={"card-body"}>
                                <h5 className={"card-title"}>Card Title</h5>
                                <p className={"card-text"}>Card Text</p>
                            </div>
                        </div>

                    </div>
            </div>

        </div>
    );
}
export default Home;

{/*{courses.map((course) => (
                        <div className="card wd-dashboard-card">
                            <Link key={course._id} to={`/Kanbas/Courses/${course._id}`} className="list-group-item wd-dashboard-card-a">
                                <div className="wd-dashboard-card-img card-img-top"></div>
                                <button className={"btn btn-outline-warning btn-sm me-2 mb-1 mt-1"}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setCourse(course);
                                        }}>
                                    Edit
                                </button>

                                <button className={"btn btn-outline-danger btn-sm mb-1 mt-1"}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                        }}>
                                    Delete
                                </button>
                                <h5 className={"card-title ps-1"}>{course.name}</h5>
                                <h6 className="card-subtitle wd-dashboard-card-a ps-1">{course.number}</h6>
                                <p className="card-text wd-dashboard-card-body-p ps-1">{course.fullId}
                                </p>
                            </Link>
                        </div>
                    ))}*/}
{/*<div className="card wd-dashboard-card">
                        <div className="wd-dashboard-card-img card-img-top">
                        </div>
                        <button className={"btn btn-outline-warning btn-sm me-2 mb-1 mt-1"}>
                            Edit
                        </button>

                        <button className={"btn btn-outline-danger btn-sm mb-1 mt-1"}>
                            Delete
                        </button>
                        <h5 className={"card-title ps-1"}>Placeholder</h5>
                        <h6 className="card-subtitle wd-dashboard-card-a ps-1">Placeholder</h6>
                        <p className="card-text wd-dashboard-card-body-p ps-1">Placeholder</p>
                    </div>*/}