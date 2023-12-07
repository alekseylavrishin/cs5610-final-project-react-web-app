import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as userClient from "./users/client";


function Register() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "", password: "", firstName: "", lastName: "", role: "", email: "" });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            if( credentials.username !== "" || credentials.password !== "") {
                await userClient.register(credentials);
                navigate("/project/account");
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
        <div>
            <h1>Register</h1>
            {error && <div>{error}</div>}

            <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-4">
                    <label htmlFor="validationUsername" className="form-label">Username</label>
                    <div className="input-group has-validation">
                        <input
                            onKeyDown={handleKeyDown}
                            required={"true"}
                            className="form-control" id="validationUsername"
                            type={"text"}
                            placeholder={"username"}
                            value={credentials.username}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                username: e.target.value })} />
                        <div className="invalid-feedback">
                            Please enter a username.
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="validationPassword" className="form-label">Password</label>
                    <div className="input-group has-validation">
                        <input
                            onKeyDown={handleKeyDown}
                            required={"true"}
                            id={"validationPassword"}
                            type={"password"}
                            placeholder={"password"}
                            value={credentials.password}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                password: e.target.value })} />
                        <div className="invalid-feedback">
                            Please enter a password.
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <input
                        type={"text"}
                        placeholder={"first name"}
                        value={credentials.firstName}
                        onChange={
                        (e) => setCredentials({
                            ...credentials, firstName: e.target.value })}/>
                    <input
                        type={"text"}
                        placeholder={"last name"}
                        value={credentials.lastName}
                        onChange={(e) => setCredentials({
                            ...credentials, lastName: e.target.value })}/>
                    <select
                        value={credentials.role}
                        onChange={(e) => setCredentials({
                            ...credentials, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="INFLUENCER">Influencer</option>
                    </select>

                    <input
                        onKeyDown={handleKeyDown}
                        placeholder={"email"}
                        type={"email"}
                        value={credentials.email}
                        onChange={(e) => setCredentials({
                            ...credentials, email: e.target.value })}/>
                </div>


                    <button className={"btn btn-primary"} type={"submit"} onClick={signup}>
                        Signup
                    </button>
            </form>
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