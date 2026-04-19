import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
    // Here you can define the state and functions that you want to provide to the context
    const [user, setUser] = React.useState(null);
    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>

    )
}

export default UserContextProvider;