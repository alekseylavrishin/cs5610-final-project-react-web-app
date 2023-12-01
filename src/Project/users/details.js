import {useParams, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as client from "./client";
import * as likesClient from "../likes/client";


function UserDetails() {
    const [user, setUser] = useState(null);
    const [likes, setLikes] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    const fetchLikes = async () => {
        const likes = await likesClient.findRecipesThatUserLikes(id)
        setLikes(likes);
    }

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

    useEffect(() => {
        fetchUser();
        fetchLikes();
    }, [])

    return (
        <div>
            <button className={"btn btn-warning float-end"}>
                Follow
            </button>
            user details
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
                </div>
            )}
        </div>
    );
}
export default UserDetails;