import * as client from "./client";
import {setCurrentUser} from "./reducer";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

function CurrentUser( {children} ) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const fetchCurrentUser = async () => {
        try {
            const user = await client.account();
            dispatch(setCurrentUser(user));
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
        //setLoading(false);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, [])
    return(

        <>
            {loading && (
                <div className={"ms-2 me-2 mt-5 mb-2 text-center"}>
                    <h1>Please wait for the application to connect to the server</h1>
                    <h3>Please refresh browser window in several seconds</h3>
                    <div className="spinner-border" role="status"></div>
                </div>

            )}
            {!loading && children}
        </>
    );
}
export default CurrentUser;