import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as client from "./client";


function UserDetails() {
    const [user, setUser] = useState(null);
    const {id} = useParams();

    const fetchUser = async () => {
        const user = await client.findUserById(id);
        setUser(user);
    };

    const updateUser = async () => {
        const status = await client.updateUser(id, user);
        //setUser(updatedUser);
    };

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
                </div>
            )}
        </div>
    );
}
export default UserDetails;