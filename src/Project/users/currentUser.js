import * as client from "./client";
import {setCurrentUser} from "./reducer";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

function CurrentUser( {children} ) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const fetchCurrentUser = async () => {
        const user = await client.account();
        dispatch(setCurrentUser(user));
        setLoading(false);
    };
    useEffect(() => {
        fetchCurrentUser();
    }, [])
    return(
        <>
            {!loading && children}
        </>
    );
}
export default CurrentUser;