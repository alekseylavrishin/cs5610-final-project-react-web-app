import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as client from "./client";
import {deleteUser} from "./client";


function UserDetails() {
    const [user, setUser] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

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
    }, [])

    return (
        <div>
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
                </div>
            )}
        </div>
    );
}
export default UserDetails;