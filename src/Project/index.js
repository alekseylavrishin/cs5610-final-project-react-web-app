import {Link, Route, Routes} from "react-router-dom";
import {Navigate} from "react-router";
import Home from "./home";
import Register from "./register";
import Search from "./search";
import Details from "./details";
import UserList from "./users/list";
import UserDetails from "./users/details";
import Signin from "./users/signin";
import Account from "./users/account";
import Navigation from "./nav";
import store from "./store";
import {Provider} from "react-redux";
import CurrentUser from "./users/currentUser";

function Project() {
    return(
        <Provider store = {store}>
            <CurrentUser>
                <div>
                    <div className={"row"}>
                        <Navigation/>
                        <div className={"col-12"}>
                            <Routes>
                                <Route path="/" element={<Navigate to="home" />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/register" element={<Register />} />
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
            </CurrentUser>
        </Provider>

    );
}
export default Project;