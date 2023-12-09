import * as client from "./client";
import {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {BsFillCheckCircleFill, BsPencil, BsPlusCircleFill, BsTrash3Fill} from "react-icons/bs";
import * as userClient from "./client";
import {setCurrentUser} from "./reducer";

function UserList() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: "", password: "", firstName: "", lastName: "",
        email: "", role: "USER" });
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState("");



    const clearSelectedUser = () => {
        setUser({username: "", password: "", firstName: "",
            lastName: "", email: "", role: "USER"});
    };

    const deleteUser = async (User) => {
        try {
            await client.deleteUser(User._id);
            if (User._id === user._id) {
                clearSelectedUser();
            }
            setUsers(users.filter((u) => u._id !== User._id));
        } catch (err) {
            console.log(err);
        }
    };

    const createUser = async () => {
        try {
            if (user.username !== "" && user.password !== ""){
                const newUser = await client.createUser(user);
                setUsers([newUser, ...users]);
            } else {
                setError("Username and password fields cannot be empty")
            }
        } catch (err) {
            setError(err.response.data.message);
            console.log(err);
        }
    };

    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    const selectUser = async (user) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };


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
        <div className={"col-11 table-responsive-md ms-5 me-5 mt-4 mb-3 "}>
            {currentUser && currentUser.role === "ADMIN" && (
            <>
                <h2>Admin Panel</h2>
                {error && <div className={"bg-danger-subtle"}>{"ERROR: "+error}</div>}
                <table className={"table"}>
                    <thead>
                    <tr>
                        <td>
                            <input placeholder={"username"} className={"form-control"} value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                        </td>
                        <td>
                            <input placeholder={"password"} className={"form-control"} value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                        </td>
                        <td>
                            <input placeholder={"First Name"} className={"form-control"} value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })}/>
                        </td>
                        <td>
                            <input placeholder={"Last Name"} className={"form-control"} value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })}/>
                        </td>
                        <td>
                            <input placeholder={"Email"} className={"form-control"} value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                        </td>
                        <td>
                            <select className={"form-control"} value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="INFLUENCER">Influencer</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button className={"btn btn-outline-dark"} onClick={clearSelectedUser}>Clear Selected</button>
                        </td>
                        <td>
                            <button className={"btn btn-outline-success"} onClick={clearSelectedUser}>Update User</button>
                        </td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>

                    </thead>
                    <tbody>


                        <td>
{/*
                            <button className={"btn btn-outline-dark"} onClick={clearSelectedUser}>Clear</button>
*/}
            {/*
                            <BsFillCheckCircleFill onClick={updateUser} type={"button"} className="me-2 text-success fs-1 text" />
                            <BsPlusCircleFill className={"text-primary fs-1"} type={"button"} onClick={createUser}/>
                            */}
                        </td>
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
                                    {user.password}
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
                            <td>
                                <td><button className="btn btn-warning me-2 mb-1">
                                    <BsPencil onClick={() => selectUser(user)} />
                                </button></td>

                                {currentUser._id !== user._id && (
                                <button className="btn btn-danger me-2"
                                        onClick={() => deleteUser(user)}>
                                    <BsTrash3Fill />
                                </button>
                                )}
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