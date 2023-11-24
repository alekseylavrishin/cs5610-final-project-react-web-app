import {Link, Route, Routes} from "react-router-dom";
import {Navigate} from "react-router";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Profile from "./profile";



function Project() {
    return(
        <div>

            <pre>{JSON.stringify(process.env.REACT_APP_API_KEY)}</pre>
            <h1>Project</h1>
            <div className={"row"}>
                <div className={"col-2"}>
                    <div className={"list-group"}>
                        <Link to={"/project/home"} className={"list-group-item"}>
                            Home
                        </Link>
                        <Link to={"/project/signup"} className={"list-group-item"}>
                            Signup
                        </Link>
                        <Link to={"/project/profile"} className={"list-group-item"}>
                            Profile
                        </Link>
                        <Link to={"/project/login"} className={"list-group-item"}>
                            Login
                        </Link>
                    </div>
                </div>
            <div className={"col-10"}>
                <Routes>
                    <Route path="/" element={<Navigate to="home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>

        </div>
        </div>

    );
}
export default Project;