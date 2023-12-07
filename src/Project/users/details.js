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
            <div className={"col-2 float-start"}>
                <div className={"row text-center mb-4"} >
                    <FaCircleUser className={"display-1"}/>
                </div>
                <div className={"row "} >
                    <ul className={"list-group ms-1"}>
                        <li className={"list-group-item"}>
                            Likes:
                        </li>
                        <li className={"list-group-item"}>
                            Followers:
                        </li>
                        <li className={"list-group-item"}>
                            Following:
                        </li>
                    </ul>
                </div>

            </div>

            <div className={"col-8"}>
                {user && (
                    <div>
                        <h3 className={"mb-3"}>{user.username}</h3>
                        <h5 className={"mb-3"}>{user.role}</h5>
                        <h5 className={"mb-3"}>{user.email}</h5>
                        <p>First Name:
                            <input type={"text"} className={"form-control"} value={user.firstName}
                                   onChange={(e) => setUser({...user, firstName: e.target.value})}
                            /></p>
                        <button className={"btn btn-primary"} onClick={updateUser}>
                            Update
                        </button>
                        <button className={"btn btn-danger"} onClick={() => deleteUser(user._id)}>
                            Delete
                        </button>

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
                                                <h5>{like.recipeName}</h5>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Tab>
                            <Tab eventKey="Followers" title="Followers">
                                {followers.length === 0 && (<p>No users are currently following {user.username}</p>)}
                                <div className={"list-group"}>
                                    {followers.map((follows, index) => (
                                        <Link key={index} className={"list-group-item"} to={`/project/users/${follows.follower._id}`}>
                                            {follows.follower.username}
                                        </Link>
                                    ))}
                                </div>
                            </Tab>
                            <Tab eventKey="Following" title="Following">
                                {following.length === 0 && (<p>{user.username} is not following any users yet</p>)}
                                <div className={"list-group"}>
                                    {following.map((follows, index) => (
                                        <Link key={index} className={"list-group-item"} to={`/project/users/${follows.followed._id}`}>
                                            {follows.followed.username}
                                        </Link>
                                    ))}
                                </div>
                            </Tab>
                        </Tabs>



                    </div>
                )}
            </div>




            <div className={"col-2 float-end text-center"}>

                    {currentUser && currentUser._id !== id &&(
                        <>
                        {alreadyFollowing() ? (
                            <button onClick={unFollowUser} className={"btn btn-danger float-end me-lg-5 me-md-3 me-sm-0"}>
                                Unfollow
                            </button>
                            ) : (
                            <button onClick={followUser} className={"btn btn-warning float-end"}>
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