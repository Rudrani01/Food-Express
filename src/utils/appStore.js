const { configureStore } = require("@reduxjs/toolkit");
import cartReducer from "./cartSlice";

// reducer is reponsible to modify the app Store
// then for each slice there is a reducer -- cartReducer
const appStore = configureStore({
    reducer : {
        cart: cartReducer,
    },
});

export default appStore;