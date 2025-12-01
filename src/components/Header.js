import { LOGO_URL } from "../utils/constants";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  console.log("Header Render");

  const onlineStatus = useOnlineStatus();

  // Standard way to use context in functional component
  const { loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);

  // if no dependency array => useEffect is called on every render
  // if dependency array is empty = [] => useEffect is called on initial render(just once)
  // if dependency array is [btnNameReact] => called everytime btnNameReact is updated
  useEffect(() => {
    console.log("useEffect called");
  }, [])

  // Selector -- hook inside react
  // useSelector hook comes form react-redux lib
  // Subscribing to the store using selector -- gives us access to the store
  // cart will get the data of the items 
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    // Header
    <div className="bg-slate-800  shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-4"> {/* header slightly taller */}

          {/* Logo */}
      
            <div className="logo-container">
              <img className="w-40 rounded-lg" src={LOGO_URL} />
            </div>

            {/* Nav items */}
            <div className="nav-items flex flex-wrap items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
              <ul className="text-white flex flex-wrap items-center p-0 m-0 space-x-2 sm:space-x-4">

                {/* Online Status */}
                <li className="px-1 sm:px-4 text-white font-bold text-xl">
                  Online Status: {onlineStatus ? "✅" : "🔴"}
                </li>

                {/* Home */}
                <li className="px-1 sm:px-4 font-bold text-xl">
                  <Link className="text-white hover:text-orange-500 transition" to="/">Home</Link>
                </li>

                {/* About */}
                <li className="px-1 sm:px-4 font-bold text-xl">
                  <Link className="text-white hover:text-orange-500 transition" to="/about">About Us</Link>
                </li>

                {/* Contact */}
                <li className="px-1 sm:px-4 font-bold text-xl">
                  <Link className="text-white hover:text-orange-500 transition" to="/contact">Contact Us</Link>
                </li>

                {/* <li className="px-4">
                <Link to="/grocery">Grocery</Link>
              </li> */}

                {/* Cart */}
                <li className="px-1 sm:px-4 font-bold text-xl">
                  <Link className="text-white hover:text-orange-500 transition" to="/cart">
                    Cart - ({cartItems.length} items)
                  </Link>
                </li>

                {/* Login button */}
                <button
                  className="px-3 py-1 bg-white text-gray-800 border border-gray-400 rounded-lg hover:bg-gray-200 hover:scale-105 transition transform duration-200"
                  // toggle 
                  onClick={() => {
                    btnNameReact === "Login" ? setBtnNameReact("Logout") : setBtnNameReact("Login");
                  }}
                >
                  {btnNameReact}
                </button>

                {/* Logged in user */}
                <li className="px-1 sm:px-4 font-medium">{loggedInUser}</li>

              </ul>
            </div>
          </div>
        </div>
      </div>
      )
};

      export default Header;
