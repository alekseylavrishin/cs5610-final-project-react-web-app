import {useParams, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as client from "./client";
import * as likesClient from "../likes/client";
import * as followsClient from "../follows/client";
import {useSelector} from "react-redux";
import {FaCircleUser} from "react-icons/fa6";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function UserDetails() {
    const [user, setUser] = useState(null);
    const [likes, setLikes] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const {currentUser} = useSelector((state) => state.userReducer);
    const {id} = useParams();
    const navigate = useNavigate();

    const fetchLikes = async () => {
        const likes = await likesClient.findRecipesThatUserLikes(id)
        setLikes(likes);
    };

    const fetchUser = async () => {
        const user = await client.findUserById(id);
        setUser(user);
    };

    const updateUser = async () => {
        const status = await client.updateUser(id, user);
        //setUser(updatedUser);
        fetchUser();

    };

    const deleteUser = async (id) => {
        const status = await client.deleteUser(id);
        navigate("/project/users");
    }

    const unFollowUser = async () => {
        const status = await followsClient.userUnfollowsUser(id);
        window.location.reload();
    };

    const followUser = async () => {
        const status = await followsClient.userFollowsUser(id);
        window.location.reload();
    };

    const fetchFollowers = async () => {
        const followers = await followsClient.findFollowersOfUser(id);
        setFollowers(followers);
    };

    const fetchFollowing = async () => {
        const following = await followsClient.findFollowedUsersByUser(id);
        setFollowing(following);
    };

    const alreadyFollowing = () => {
        return followers.some((follows) => {
            return follows.follower._id === currentUser._id;
        });
    };


    useEffect(() => {
        fetchUser();
        fetchLikes();
        fetchFollowers();
        fetchFollowing();
    }, [id])

    return (
        <div className={"row mt-4 ms-1 me-1"}>

            {/*{currentUser && currentUser._id === id && (
                navigate("/project/account")
            )}*/}

            <div className={"col-2 col-sm-3 col-md-2 col-lg-2 float-start"}>
                <div className={"row text-center mb-4 mt-1"} >
                    <FaCircleUser className={"display-1"}/>
                </div>
                <div className={"row "} >
                    <ul className={"list-group ms-1 mt-4"}>
                        <li className={"list-group-item"}>
                            <div className={"w-50 float-start"}>
                                Likes:
                            </div>
                            <div className={"w-50 float-end text-end"}>
                                {likes.length}
                            </div>
                        </li>
                        <li className={"list-group-item"}>
                            <div className={"w-50 float-start"}>
                                Followers:
                            </div>
                            <div className={"w-50 float-end text-end"}>
                                {followers.length}
                            </div>
                        </li>
                        <li className={"list-group-item"}>
                            <div className={"w-50 float-start"}>
                                Following:
                            </div>
                            <div className={"w-50 float-end text-end"}>
                                {following.length}
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

            <div className={"col-lg-8 col-sm-8"}>
                {user && (
                    <div>
                        <h3 className={"mb-3"}>{user.username}</h3>
                        <h5 className={"mb-3"}>{user.role}</h5>
                        <h5 className={"mb-3"}>{user.email}</h5>

                        {/*<p>First Name:
                            <input type={"text"} className={"form-control"} value={user.firstName}
                                   onChange={(e) => setUser({...user, firstName: e.target.value})}
                            /></p>
                        <button className={"btn btn-primary"} onClick={updateUser}>
                            Update
                        </button>
                        <button className={"btn btn-danger"} onClick={() => deleteUser(user._id)}>
                            Delete
                        </button>*/}

                        <Tabs
                            defaultActiveKey="Likes"
                            id="uncontrolled-tab-example"
                            className="mb-3">
                            <Tab eventKey="Likes" title="Liked Recipes">
                                {likes.length === 0 && (<p>{user.username} has not liked any recipes yet</p>)}
                                <ul className={"list-group"}>
                                    {likes.map((like, index) => (
                                        <li key={index} className={"list-group-item"}>
                                            <Link to={`/project/details/${like.recipeId}`}>
                                                <div className={"float-start col-3"}>
                                                    <img className={"rounded"}
                                                        width={208}
                                                         height={138.75}
                                                         src={like.recipeImage}/>
                                                </div>
                                                <div className={"float-lg-start float-md-end float-sm-end float-xs-end col-6 ps-4 ms-4"}>
                                                <span>{like.recipeName}</span>
                                                </div>

                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Tab>
                            <Tab eventKey="Followers" title="Followers">
                                {followers.length === 0 && (<p>No users are currently following {user.username}</p>)}
                                <div className={"list-group"}>
                                    {followers.map((follows, index) => (
                                        <li className={"list-group-item row"}>
                                            <Link key={index}  to={`/project/users/${follows.follower._id}`}>
                                                <div className={"col-2 float-start"}>
                                                    <FaCircleUser fontSize={40} className={"me-2"}/>
                                                </div>
                                                <div className={"col-5 float-start mt-2 mb-2"}>
                                                    {follows.follower.username}
                                                </div>
                                            </Link>
                                            <div className={"col-2 float-end"}>
                                                {currentUser && currentUser._id === id && (
                                                    <button
                                                        className={"btn btn-primary"}
                                                        onClick={() => fetchFollowing()}>
                                                        asdf
                                                    </button>
                                                )}
                                            </div>
                                        </li>
                                    ))}

                                </div>
                            </Tab>
                            <Tab eventKey="Following" title="Following">
                                {following.length === 0 && (<p>{user.username} is not following any users yet</p>)}


                                <div className={"list-group"}>
                                    {following.map((follows, index) => (
                                        <li className={"list-group-item row"}>
                                            <Link key={index}  to={`/project/users/${follows.followed._id}`}>
                                                <div className={"col-2 float-start"}>
                                                    <FaCircleUser fontSize={40} className={"me-2"}/>
                                                </div>
                                                <div className={"col-5 float-start mt-2 mb-2"}>
                                                    {follows.followed.username}
                                                </div>
                                            </Link>
                                            <div className={"col-2 float-end"}>
                                                {currentUser && currentUser._id === id && (
                                                    <button
                                                    className={"btn btn-danger"}
                                                    onClick={() => fetchFollowing()}>
                                                    Unfollow
                                                    </button>
                                                )}
                                            </div>
                                        </li>
                                    ))}

                                </div>
                            </Tab>
                            {currentUser && currentUser._id === id && (
                                <Tab eventKey="myInfo" title="My Info">
                                    <div>
                                        <div className={"row"} >
                                            <ul className={"list-group ms-1 mt-4"}>
                                                <li className={"list-group-item"}>
                                                    <div className={"w-50 float-start"}>
                                                        Username:
                                                    </div>
                                                    <div className={"w-50 float-end text-end"}>
                                                        {currentUser.username}
                                                    </div>
                                                </li>
                                                <li className={"list-group-item"}>
                                                    <div className={"w-50 float-start"}>
                                                        First Name:
                                                    </div>
                                                    <div className={"w-50 float-end text-end"}>
                                                        {currentUser.firstName}                                                    </div>
                                                </li>
                                                <li className={"list-group-item"}>
                                                    <div className={"w-50 float-start"}>
                                                        Last Name:
                                                    </div>
                                                    <div className={"w-50 float-end text-end"}>
                                                        {currentUser.lastName}
                                                    </div>
                                                </li>
                                                <li className={"list-group-item"}>
                                                    <div className={"w-50 float-start"}>
                                                        Email:
                                                    </div>
                                                    <div className={"w-50 float-end text-end"}>
                                                        {currentUser.email}
                                                    </div>
                                                </li>
                                                <li className={"list-group-item"}>
                                                    <div className={"w-50 float-start"}>
                                                        role:
                                                    </div>
                                                    <div className={"w-50 float-end text-end"}>
                                                        {currentUser.role}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Tab>
                            )}
                            {currentUser && currentUser._id === id && (
                                <Tab eventKey="edit" title="Edit">


                                    <div>
                                        <p>Username: {user.username}</p>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={user.email}
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={user.firstName}
                                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={user.lastName}
                                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                        />
                                        <button onClick={updateUser} className="btn btn-primary">
                                            Update
                                        </button>

                                    </div>






                                    <div>
                                        <div className={"row"} >
                                            <ul className={"list-group ms-1 mt-4"}>
                                                <li className={"list-group-item"}>
                                                    <div className={"w-50 float-start"}>
                                                        Username:
                                                    </div>
                                                    <div className={"w-50 float-end text-end"}>
                                                        {user.username}
                                                    </div>
                                                </li>
                                                <li className={"list-group-item"}>
                                                    <div className={"w-50 float-start"}>
                                                        First Name:
                                                    </div>
                                                    <div className={"w-50 float-end text-end"}>
                                                        {user.firstName}                                                    </div>
                                                </li>
                                                <li className={"list-group-item"}>
                                                    <div className={"w-50 float-start"}>
                                                        Last Name:
                                                    </div>
                                                    <div className={"w-50 float-end text-end"}>
                                                        {currentUser.lastName}
                                                    </div>
                                                </li>
                                                <li className={"list-group-item"}>
                                                    <div className={"w-50 float-start"}>
                                                        Email:
                                                    </div>
                                                    <div className={"w-50 float-end text-end"}>
                                                        {currentUser.email}
                                                    </div>
                                                </li>
                                                <li className={"list-group-item"}>
                                                    <div className={"w-50 float-start"}>
                                                        role:
                                                    </div>
                                                    <div className={"w-50 float-end text-end"}>
                                                        {currentUser.role}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Tab>
                            )}
                        </Tabs>
                    </div>
                )}
            </div>




            <div className={"col-2 float-end text-center"}>
                    {currentUser && currentUser._id !== id &&(
                        <>
                        {alreadyFollowing() ? (
                            <button onClick={unFollowUser} className={"btn btn-danger float-end me-lg-5 me-md-2 me-sm-0"}>
                                Unfollow
                            </button>
                            ) : (
                            <button onClick={followUser} className={"btn btn-warning float-end me-lg-5 me-md-2 me-sm-0"}>
                                Follow
                            </button>
                            )}
                        </>
                    )}



            </div>

        </div>
    );
}
export default UserDetails;