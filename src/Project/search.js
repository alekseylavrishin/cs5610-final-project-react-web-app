import {useEffect, useState} from "react";
import * as client from "./client";
import {Link, useParams, useNavigate} from "react-router-dom";

function Search() {
    const {search} = useParams();
    const [searchTerm, setSearchTerm] = useState(search);
    const [results, setResults] = useState(null);
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState("");


    const fetchRecipes = async (search) => {
        try {
            const results = await client.findRecipes(search);
            setResults(results.results);
            setSearchTerm(search);
        }
        catch(error) {
            setError(error.response.data.message)
        }
    };

    useEffect(() => {
        if(search) {
            fetchRecipes(search);
        }
    }, [search])


    return(
        <div className={"ms-3 me-3 mt-3"}>
            <div className={"row"}>
                <div className={"row ms-3"}>
                    <h2>Search for a Recipe</h2>
                </div>
                <div className={"row ms-3"}>
                    <div className={"col-6 float-start"}>
                        <input
                            type={"text"}
                            className={"form-control"}
                            placeholder={"Search..."}
                            onChange={(event) => {
                                setSearchTerm(event.target.value)
                            }} />
                    </div>
                    <div className={"col-6"}>
                        <button
                            type={"submit"}
                            onClick={() => navigate(`/project/search/${searchTerm}`)}
                            className={"btn btn-light btn-outline-dark float-start"}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
           {/* <h2>Results</h2>
            {error && <div className={"bg-danger-subtle text-center"}>{error}</div>}
            <ul className={"list-group"}>
                {results &&
                    results.map((recipe, index) => (
                        <li key={index} className={"list-group-item"}>
                            <Link to={`/project/details/${recipe.id}`}>
                                <h3>{recipe.title}</h3>
                                <img src={recipe.image} alt={recipe.name}/>
                            </Link>
                        </li>
                    ))
                }
            </ul>*/}


            <div className={"row mt-4"}>
            <div className="justify-content-center float-start container d-flex flex-row flex-wrap">
                {results &&
                    results.map((recipe, index) => (
                        <Link to={`/project/details/${recipe.id}`}>
                            <div className="float-start card wd-dashboard-card">
                                <img src={recipe.image}
                                     className="card-img-top" alt="Recipe Image"/>
                                <div className={"card-body"}>
                                    <h5 className={"card-title"}>{recipe.title}</h5>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
            </div>








{/*
            <pre>{JSON.stringify(results, null, 2)}</pre>
*/}

        </div>
    );
}
export default Search;