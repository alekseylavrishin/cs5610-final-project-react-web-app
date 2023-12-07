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
     /*   <div>
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

            {/!*{(currentUser === null || currentUser.role !== "ADMIN") && (*!/}
            {currentUser && currentUser.role !== "ADMIN" && (
                <Navigate to="/project/signin" />
            )}
        </div>*/


        <div className={"col-11"}>
            {currentUser && currentUser.role === "ADMIN" && (
            <>
                <h2>Admin Panel</h2>
                <table className={"table"}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <Link
                                    key={user._id}
                                    to={`/project/users/${user._id}`}
                                    className={"list-group-item"}>
                                    {user.username}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    key={user._id}
                                    to={`/project/users/${user._id}`}
                                    className={"list-group-item"}>
                                    {user.firstName}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    key={user._id}
                                    to={`/project/users/${user._id}`}
                                    className={"list-group-item"}>
                                    {user.lastName}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    key={user._id}
                                    to={`/project/users/${user._id}`}
                                    className={"list-group-item"}>
                                    {user.email}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    key={user._id}
                                    to={`/project/users/${user._id}`}
                                    className={"list-group-item"}>
                                    {user.role}
                                </Link>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
                </>
            )}
{/*</div>*/}

            {currentUser && currentUser.role !== "ADMIN" && (
                <Navigate to="/project/signin" />
            )}
        </div>
    );
}
export default UserList;