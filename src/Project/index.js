import {Link, Route, Routes} from "react-router-dom";
import {Navigate} from "react-router";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
//import Account from "./profile";
import Search from "./search";
import Details from "./details";
import UserList from "./users/list";
import UserDetails from "./users/details";
import Signin from "./users/signin";
import Account from "./users/account";

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
                        <Link to={"/project/account"} className={"list-group-item"}>
                            Account
                        </Link>
                        <Link to={"/project/signin"} className={"list-group-item"}>
                            Sign In
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
{/*
                    <Route path="/profile" element={<Account />} />
*/}
                    <Route path="/account" element={<Account />}/>
                    <Route path="/signin" element={<Signin />} />
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