import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as userClient from "./users/client";
import {setCurrentUser} from "./users/reducer";
import {useDispatch} from "react-redux";


function Register() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "", password: "", firstName: "", lastName: "", role: "USER", email: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signup = async () => {
        try {
            if( credentials.username !== "" || credentials.password !== "") {
                const user = await userClient.register(credentials);
                dispatch(setCurrentUser(user));
                navigate(`/project/users/${user._id}`);
            }
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // disregard spaces in username, password, email fields
    const handleKeyDown = event => {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    };

    (() => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()


    return (
        <div className={"row justify-content-center"}>
        <div className={"col-10 text-center border border-dark-subtle border-2 mt-4"}>
            <div className="row d-flex justify-content-center mb-2 mt-2">
                <h2>Register for Recipe Finder</h2>
            </div>
            {error && <div>{error}</div>}

            <form className="row needs-validation" noValidate>
                <div className="row d-flex justify-content-center mb-2">
                    <label htmlFor="validationUsername" className="form-label mt-2">Username</label>
                    <div className="input-group has-validation w-50">
                        <input
                            onKeyDown={handleKeyDown}
                            required={"true"}
                            className={"form-control"}
                            id="validationUsername"
                            type={"text"}
                            placeholder={"Username"}
                            value={credentials.username}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                username: e.target.value })} />
                        <div className="invalid-feedback">
                            Please enter a username.
                        </div>
                    </div>
                </div>

                <div className="row d-flex justify-content-center mb-2">
                    <label htmlFor="validationPassword" className="form-label">Password</label>
                    <div className="input-group has-validation w-50">
                        <input
                            onKeyDown={handleKeyDown}
                            required={"true"}
                            className="form-control"
                            id={"validationPassword"}
                            type={"password"}
                            placeholder={"Password"}
                            value={credentials.password}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                password: e.target.value })} />
                        <div className="invalid-feedback">
                            Please enter a password.
                        </div>
                    </div>
                </div>

                <div className="row d-flex justify-content-center">
                    <div className={"w-50"}>
                        <label htmlFor="inputFirstName" className="form-label">First Name</label>
                        <input
                        type={"text"}
                        className="form-control mb-2"
                        placeholder={"First Name"}
                        value={credentials.firstName}
                        onChange={
                        (e) => setCredentials({
                            ...credentials, firstName: e.target.value })}/>

                        <label htmlFor="inputLastName" className="form-label">Last Name</label>
                        <input
                        type={"text"}
                        className="form-control mb-2"
                        placeholder={"Last Name"}
                        value={credentials.lastName}
                        onChange={(e) => setCredentials({
                            ...credentials, lastName: e.target.value })}/>

                        <label htmlFor="userDropdown" className="form-label">User Type</label><br/>
                        <select
                            value={credentials.role}
                            className="dropdown mb-2 w-50"
                            onChange={(e) => setCredentials({
                                ...credentials, role: e.target.value })}>
                            <option value="USER" selected>User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="INFLUENCER">Influencer</option>
                        </select><br/>

                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input
                        onKeyDown={handleKeyDown}
                        className="form-control mb-4"
                        placeholder={"Email"}
                        type={"email"}
                        value={credentials.email}
                        onChange={(e) => setCredentials({
                            ...credentials, email: e.target.value })}/>



                        <button className={"btn btn-light btn-outline-dark w-100 mb-4"} type={"submit"} onClick={signup}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
        </div>
        </div>


        );
    }
export default Register;

/* <div>
     <h1>Register</h1>
     {error && <div>{error}</div>}
     <input
         type={"text"}
         placeholder={"username"}
         value={credentials.username}
         onChange={(e) => setCredentials({
             ...credentials,
             username: e.target.value })} />
     <input
         required={true}
         type={"password"}
         placeholder={"password"}
         value={credentials.password}
         onChange={(e) => setCredentials({
             ...credentials,
             password: e.target.value })} />
     <input
         required={true}
         type={"text"}
         placeholder={"first name"}
        value={credentials.firstName}
        onChange={(e) => setCredentials({
            ...credentials, firstName: e.target.value })}/>
     <input
         required={true}
         type={"text"}
         placeholder={"last name"}
         value={credentials.lastName}
         onChange={(e) => setCredentials({
         ...credentials, lastName: e.target.value })}/>
     <select
         required={true}
         value={credentials.role}
             onChange={(e) => setCredentials({
         ...credentials, role: e.target.value })}>
         <option value="USER">User</option>
         <option value="ADMIN">Admin</option>
         <option value="INFLUENCER">Influencer</option>
     </select>

     <input
         placeholder={"email"}
         type={"email"}
         value={credentials.email}
         onChange={(e) => setCredentials({
             ...credentials, email: e.target.value })}/>



     <button className={"btn btn-primary"} onClick={signup}>
         Signup
     </button>
 </div>*/