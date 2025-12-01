// assumes that this is a global type of context 
import { createContext } from "react";

const UserContext = createContext({
    loggedInUser: "Default User",
});

export default UserContext;