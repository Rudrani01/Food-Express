import { LOGO_URL } from "../utils/constants";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <div className="bg-slate-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">

          {/* Logo */}
          <div className="logo-container">
            <img className="w-28 sm:w-40 rounded-lg" src={LOGO_URL} />
          </div>

          {/* Hamburger Menu Button - Mobile Only */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          {/* Nav items - Desktop */}
          <div className="hidden md:flex nav-items items-center space-x-4">
            <ul className="text-white flex items-center p-0 m-0 space-x-4">

              {/* Online Status */}
              <li className="px-2 lg:px-4 text-white font-bold text-base lg:text-xl">
                Online Status: {onlineStatus ? "✅" : "🔴"}
              </li>

              {/* Home */}
              <li className="px-2 lg:px-4 font-bold text-base lg:text-xl">
                <Link className="text-white hover:text-orange-500 transition" to="/">Home</Link>
              </li>

              {/* About */}
              <li className="px-2 lg:px-4 font-bold text-base lg:text-xl">
                <Link className="text-white hover:text-orange-500 transition" to="/about">About Us</Link>
              </li>

              {/* Contact */}
              <li className="px-2 lg:px-4 font-bold text-base lg:text-xl">
                <Link className="text-white hover:text-orange-500 transition" to="/contact">Contact Us</Link>
              </li>

              {/* Cart */}
              <li className="px-2 lg:px-4 font-bold text-base lg:text-xl">
                <Link className="text-white hover:text-orange-500 transition" to="/cart">
                  Cart - ({cartItems.length})
                </Link>
              </li>

              {/* Login button */}
              <button
                className="px-3 py-1 bg-white text-gray-800 border border-gray-400 rounded-lg hover:bg-gray-200 hover:scale-105 transition transform duration-200"
                onClick={() => {
                  btnNameReact === "Login" ? setBtnNameReact("Logout") : setBtnNameReact("Login");
                }}
              >
                {btnNameReact}
              </button>

              {/* Logged in user */}
              <li className="px-2 lg:px-4 font-medium">{loggedInUser}</li>

            </ul>
          </div>
        </div>

        {/* Mobile Menu - Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <ul className="text-white space-y-3">

              {/* Online Status */}
              <li className="py-2 border-b border-slate-600">
                Online Status: {onlineStatus ? "✅" : "🔴"}
              </li>

              {/* Home */}
              <li className="py-2 border-b border-slate-600">
                <Link 
                  className="text-white hover:text-orange-500 transition block" 
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              {/* About */}
              <li className="py-2 border-b border-slate-600">
                <Link 
                  className="text-white hover:text-orange-500 transition block" 
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>

              {/* Contact */}
              <li className="py-2 border-b border-slate-600">
                <Link 
                  className="text-white hover:text-orange-500 transition block" 
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </li>

              {/* Cart */}
              <li className="py-2 border-b border-slate-600">
                <Link 
                  className="text-white hover:text-orange-500 transition block" 
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart - ({cartItems.length} items)
                </Link>
              </li>

              {/* Login button */}
              <li className="py-2 border-b border-slate-600">
                <button
                  className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-400 rounded-lg hover:bg-gray-200 transition"
                  onClick={() => {
                    btnNameReact === "Login" ? setBtnNameReact("Logout") : setBtnNameReact("Login");
                  }}
                >
                  {btnNameReact}
                </button>
              </li>

              {/* Logged in user */}
              <li className="py-2 font-medium">User: {loggedInUser}</li>

            </ul>
          </div>
        )}
      </div>
    </div>
  )
};

export default Header;