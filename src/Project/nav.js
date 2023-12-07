import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaUtensils, FaMagnifyingGlass, FaCircleUser} from "react-icons/fa6";
import {Button, Container, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useEffect, useState} from "react";
import * as client from "./users/client";
import {setCurrentUser} from "./users/reducer";

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
        /*<>
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
                {/!*<Link to={"/project/details"} className={"list-group-item"}>
                                Details
                            </Link>*!/}

                {/!*uncomment later*!/}
                {/!*{currentUser && currentUser.role === "ADMIN" && (*!/}
                    <Link to={"/project/users"} className={"list-group-item"}>
                        Users
                    </Link>
                {/!*)}*!/}
            </div>
{/!*
            {currentUser && (JSON.stringify(currentUser))}
*!/}
        </div>
        </>*/
        <Navbar expand={"md"} className={"bg bg-body-secondary"}>
            <Container>
                <Navbar.Brand className={"me-5"}>
                    <Link to={"/project/home"} className={"navbar-brand"}>
                        Recipe Finder <FaUtensils/>
                    </Link>

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {/*<Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(event) => {
                                setSearchTerm(event.target.value)
                            }}
                        />
                        <button className="btn btn-success"
                                onClick={() => navigate(`/project/search/${searchTerm}`)}
                        ><FaMagnifyingGlass/></button>
                    </Form>*/}


                    <Nav className="ms-3 me-auto">

                        <Nav.Link className={"me-lg-4"}>
                            <Link to={"/project/home"} className={"list-group-item"}>
                                Home
                            </Link>
                        </Nav.Link>

                        <Nav.Link className={"me-lg-4"}>
                            <Link to={"/project/search"} className={"list-group-item"}>
                                Search For a Recipe
                            </Link>
                        </Nav.Link>

                        {currentUser &&(
                            <>
                                <Nav.Link className={"me-lg-4"}>
                                    <span className={"list-group-item"}>
                                        <FaCircleUser className={"me-1"}/>{currentUser.username}
                                    </span>
                                </Nav.Link>

                                <Nav.Link className={"me-lg-4"}>
                                        <Link to={"/project/account"} className={"list-group-item"}>
                                            My Account
                                        </Link>
                                </Nav.Link>

                                <Nav.Link className={"me-lg-4"}>
                                    <button onClick={signout} className={"list-group-item"}>
                                        Sign Out
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
                      {/*  <Nav.Link>
                            <Link to={"/project/search"} className={"list-group-item"}>
                                Search
                            </Link>
                        </Nav.Link>*/}


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

