import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaUtensils, FaMagnifyingGlass, FaCircleUser} from "react-icons/fa6";
import {Button, Container, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useEffect, useState} from "react";
import * as client from "./users/client";
import {setCurrentUser} from "./users/reducer";
import "./home.css";

function Navigation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {search} = useParams();
    const [searchTerm, setSearchTerm] = useState(search);
    const {currentUser} = useSelector((state) => state.userReducer);


    const signout = async () => {
        const status = await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/project/signin");
    };

    useEffect(() => {

    }, [search])



    return(
        <Navbar expand={"lg"} className={"bg pj-navbar-background"}>
            <Container>
                <Navbar.Brand className={"me-5"}>
                    <Link to={"/project/home"} className={"navbar-brand"}>
                        <span className={"pj-navbar-font-title"}>Recipe Finder <FaUtensils/> </span>
                    </Link>

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-3 me-auto">

                        {/*<Nav.Link className={"me-lg-4"}>
                            <Link to={"/project/detailsPH"} className={"list-group-item"}>
                                <span className={"pj-navbar-font"}>Details Placeholder</span>
                            </Link>
                        </Nav.Link>*/}

                        <Nav.Link className={"me-lg-4"}>
                            <Link to={"/project/home"} className={"list-group-item"}>
                                <span className={"pj-navbar-font"}>Home</span>
                            </Link>
                        </Nav.Link>

                        <Nav.Link className={"me-lg-4"}>
                            <Link to={"/project/search"} className={"list-group-item"}>
                                <span className={"pj-navbar-font"}>Search For a Recipe</span>
                            </Link>
                        </Nav.Link>

                        {currentUser &&(
                            <>
                                <Nav.Link className={"me-lg-4"}>
                                    <span className={"list-group-item pj-navbar-font"}>
                                        <FaCircleUser className={"me-1"}/>{currentUser.username}
                                    </span>
                                </Nav.Link>

                                <Nav.Link className={"me-lg-4"}>
                                        {/*<Link to={"/project/account"} className={"list-group-item"}>
                                            My Account
                                        </Link>*/}
                                    <Link to={`/project/users/${currentUser._id}`} className={"list-group-item"}>
                                        <span className={"pj-navbar-font"}>My Account</span>
                                    </Link>
                                </Nav.Link>

                                <Nav.Link className={"me-lg-4"}>
                                    <button onClick={signout} className={"list-group-item"}>
                                        <span className={"pj-navbar-font"}>Sign Out</span>
                                    </button>
                                </Nav.Link>
                            </>
                        )}

                        {!currentUser && (
                            <>
                                <Nav.Link className={"me-lg-4"}>
                                    <Link to={"/project/signin"} className={"list-group-item"}>
                                        Sign In
                                    </Link>
                                </Nav.Link>
                                <Nav.Link className={"me-lg-4"}>
                                    <Link to={"/project/register"} className={"list-group-item"}>
                                        Register
                                    </Link>
                                </Nav.Link>
                            </>
                        )}

                       {currentUser && currentUser.role === "ADMIN" && (
                           <Nav.Link className={"me-auto"}>
                                <Link to={"/project/users"} className={"list-group-item"}>
                                    Users
                                </Link>
                           </Nav.Link>
                           )}


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Navigation;

