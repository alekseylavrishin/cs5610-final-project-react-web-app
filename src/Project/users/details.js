import {useParams, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as client from "./client";
import * as likesClient from "../likes/client";
import * as followsClient from "../follows/client";
import {useSelector} from "react-redux";



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
        <div>
            {currentUser && currentUser._id !== id &&(
                <>
                {alreadyFollowing() ? (
                    <button onClick={unFollowUser} className={"btn btn-danger float-end"}>
                        Unfollow
                    </button>
                    ) : (
                    <button onClick={followUser} className={"btn btn-warning float-end"}>
                        Follow
                    </button>
                    )}
                </>
            )}
            <h3>user details</h3>
            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
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
                    <h3>Likes</h3>
                    <ul className={"list-group"}>
                        {likes.map((like, index) => (
                            <li key={index} className={"list-group-item"}>
                                <Link to={`/project/details/${like.recipeId}`}>
                                    <h5>{like.recipeId}</h5>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <h3>Followers</h3>
                    <div className={"list-group"}>
                        {followers.map((follows, index) => (
                            <Link key={index} className={"list-group-item"} to={`/project/users/${follows.follower._id}`}>
                                {follows.follower.username}
                            </Link>
                        ))}
                    </div>
                    <h3>Following</h3>
                    <div className={"list-group"}>
                        {following.map((follows, index) => (
                            <Link key={index} className={"list-group-item"} to={`/project/users/${follows.followed._id}`}>
                                {follows.followed.username}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
export default UserDetails;