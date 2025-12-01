import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import React, { lazy, Suspense } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
// import Grocery from "./components/Grocery";
import '../index.css';

// breaking app into smaller logical chunks ----
// Chunking
// Code Spiltting
// Dynamic Bundling
// lazy loading
// on demand loading
// dynamic import

// const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));

// app component 
const AppLayout = () => {

    const [userName, setUserName] = useState();

    // authentication

    useEffect(() => {
        // make an API call and send username and password
        const data = {
            name: "Rudrani Dhomne"
        }
        // to update userInfo
        setUserName(data.name);
    }, [])

    return (
        // passing the store as props over here(react-redux lib--- app store provided/ wrapped whole app inside store)
        <Provider store={appStore}>
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
            <div className="app">
                <Header />
                <Outlet />
            </div>
        </UserContext.Provider>
        </Provider>

    );
};

// creating router configuration  => what will happen on the specific route/path
// createBrowserRouter => creates a list of paths
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                // element: <About />,
                element: (
                    <Suspense fallback={<h1>Loading....</h1>}>
                        <About />
                    </Suspense>
                ),
            },

            {
                path: "/contact",
                element: <Contact />,
            },

            // {
            //     path: "/grocery",
            //     element: (
            //         <Suspense fallback={<h1>Loading....</h1>}>
            //             <Grocery />
            //         </Suspense>
            //     ),
            // },
            /**Dynamic Routing */
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />
            },

            
            {
                path: "/cart",
                element: <Cart />,
            },

        ],
        errorElement: <Error />,
    },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// providing router config
// RouterProvider => configuration
root.render(<RouterProvider router={appRouter} />);

// root.render(<AppLayout />);

//  <UserContext.Provider value={{ loggedInUser: "Elon Musk"}}>
{/* // Elon Musk */ }
// <Header />
// </UserContext.Provider>