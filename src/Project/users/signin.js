import {useState} from "react";
import * as client from "./client";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "./reducer";


function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signIn = async () => {
        try {
            const credentials = {username: username, password: password};
            const user = await client.signin(credentials);
            dispatch(setCurrentUser(user));
            navigate(`/project/users/${user._id}`)
        }
        catch (error){
            setError(error);
        }
    };

    return(
        <div className={"row col-12 justify-content-center"}>
            <div className={"col-10 text-center border border-dark-subtle border-2 ms-4 me-4 mt-4 mb-4"}>
                <h2 className={"mt-2 mb-2"}> Sign In</h2>
                <div className={"form-group mb-4 row d-flex justify-content-center"}>
                    {error && <div className={"alert alert-danger col-11"}>{error.message} </div>}

                    <label className="form-label" htmlFor="inputUsername">Username</label>
                    <input
                        placeholder={"Username"}
                        type={"text"}
                        className={"form-control w-50"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="inputUsername"
                    />
                </div>
                <div className={"form-group mb-4 row d-flex justify-content-center"}>
                    <label className="form-label" htmlFor="inputPassword">Password</label>
                    <input
                        placeholder={"Password"}
                        type={"password"}
                        className={"form-control w-50"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id={"inputPassword"}
                    />
                </div>
                <div className={"row d-flex justify-content-center"}>
                    <button
                        onClick={signIn}
                        className={"btn btn-light btn-outline-dark w-50 mb-4"}>
                        Sign In
                    </button>
                </div>
                <div className="text-center">
                    <p>Not a member? <Link to={"/project/register"}>Register</Link></p>
                </div>
            </div>
        </div>
    );
}
export default Signin;
