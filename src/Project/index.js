import {Link, Route, Routes} from "react-router-dom";
import {Navigate} from "react-router";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Profile from "./profile";
import Search from "./search";
import Details from "./details";
import UserList from "./users/list";
import UserDetails from "./users/details";

function Project() {
    return(
        <div>
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
                        <Link to={"/project/search"} className={"list-group-item"}>
                            Search
                        </Link>
                        {/*<Link to={"/project/details"} className={"list-group-item"}>
                            Details
                        </Link>*/}
                        <Link to={"/project/users"} className={"list-group-item"}>
                            Users
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
                    <Route path="/search" element={<Search />} />
                    <Route path="/search/:search" element={<Search />} />
                    <Route path="/details/:recipeId" element={<Details />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="users/:id" element={<UserDetails />}/>
                </Routes>
            </div>

        </div>
        </div>

    );
}
export default Project;