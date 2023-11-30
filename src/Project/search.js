import {useEffect, useState} from "react";
import * as client from "./client";
import {Link, useParams, useNavigate} from "react-router-dom";

function Search() {
    const {search} = useParams();
    const [searchTerm, setSearchTerm] = useState(search);
    const [results, setResults] = useState(null);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const fetchRecipes = async (search) => {
        const results = await client.findRecipes(search);
        setResults(results.results);
        setSearchTerm(search);
    };

    useEffect(() => {
        if(search) {
            fetchRecipes(search);
        }
    }, [search])


    return(
        <div>
            <h1>Search</h1>

            <button
                onClick={() => navigate(`/project/search/${searchTerm}`)}
                className={"btn btn-primary float-end"}>
                Search
            </button>
            <input
                type={"text"}
                className={"form-control w-75"}
                placeholder={"Search..."}
                onChange={(event) => {
                    setSearchTerm(event.target.value)
                }}
            />
            <h2>Results</h2>
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


            </ul>
{/*
            <pre>{JSON.stringify(results, null, 2)}</pre>
*/}

        </div>
    );
}
export default Search;