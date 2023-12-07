import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function Navigation() {
    const {currentUser} = useSelector((state) => state.userReducer);
    return(
        <>
        <div className={"col-2"}>
            <div className={"list-group"}>
                <Link to={"/project/home"} className={"list-group-item"}>
                    Home
                </Link>
                {currentUser &&(
                    <Link to={"/project/account"} className={"list-group-item"}>
                        Account
                    </Link>
                )}
                {!currentUser && (
                    <>
                        <Link to={"/project/signin"} className={"list-group-item"}>
                            Sign In
                        </Link>
                        <Link to={"/project/register"} className={"list-group-item"}>
                        Register
                        </Link>
                    </>
                )}
                <Link to={"/project/search"} className={"list-group-item"}>
                    Search
                </Link>
                {/*<Link to={"/project/details"} className={"list-group-item"}>
                                Details
                            </Link>*/}

                {/*uncomment later*/}
                {/*{currentUser && currentUser.role === "ADMIN" && (*/}
                    <Link to={"/project/users"} className={"list-group-item"}>
                        Users
                    </Link>
                {/*)}*/}
            </div>
{/*
            {currentUser && (JSON.stringify(currentUser))}
*/}
        </div>
        </>
    );
}
export default Navigation;