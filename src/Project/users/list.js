import * as client from "./client";
import {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";

function UserList() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);


    const fetchUser = async () => {
        const user = await client.account();
        setCurrentUser(user);
    };

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    useEffect(() => {
        fetchUsers();
        fetchUser();
    }, [])

    return(
        <div>
            {currentUser && currentUser.role === "ADMIN" && (
                <>
                <h2>Users</h2>
                <div>
                    {users.map((user) => (
                        <Link
                            key={user._id}
                            to={`/project/users/${user._id}`}
                            className={"list-group-item"}>
                            {user.username}
                        </Link>
                    ))}
                </div>
                </>
            )}

            {/*{(currentUser === null || currentUser.role !== "ADMIN") && (*/}
            {currentUser && currentUser.role !== "ADMIN" && (
                <Navigate to="/project/signin" />
            )}
        </div>
    );
}
export default UserList;