import React, {useEffect} from "react";
import {auth} from "../../api/auth";

const Logout = () => {
    useEffect(() => {
        auth.logout().then(() => window.location.href = "/login");
    }, []);

    return (
        <></>
    );
}

export default Logout;