import logo from "url:../images/logo.png";
import cartIcon from "url:../images/cart.png";
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
  }, []);

  // Selector -- hook inside react
  // useSelector hook comes form react-redux lib
  // Subscribing to the store using selector -- gives us access to the store
  // cart will get the data of the items 
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    // Header
    <div className="shadow-md sticky top-0 z-50 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Updated header height for responsive logo */}
        <div className="flex items-center justify-between h-[100px] sm:h-[100px] lg:h-[100px]">


          {/* Logo */}
          <div className="logo-container flex items-center">

            {console.log("LOGO =>", logo)}

            <img
              src={logo}
              alt="logo"
              className="h-22 sm:h-26 lg:h-30 w-auto object-contain -my-3 -mx-8 transform transition duration-300 hover:scale-110"
            // onError={(e) => {
            //   console.log("Image failed to load");
            //   console.log("Src value:", e.target.src);
            // }}
            />
          </div>

          {/* Hamburger Menu Button - Mobile Only */}
          <button
            className="md:hidden text-black text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          {/* Nav items - Desktop */}
          <div className="hidden md:flex nav-items items-center space-x-4">
            <ul className="text-gray-800 flex items-center p-0 m-0 space-x-4">

              {/* Online Status */}
              <li className="px-2 lg:px-4 text-gray-800 font-semibold text-base lg:text-xl">
                Online Status: {onlineStatus ? "✅" : "🔴"}
              </li>

              {/* Home */}
              <li className="px-2 lg:px-4 font-semibold text-base lg:text-xl">
                <Link className="text-gray-800 hover:text-orange-600 transition" to="/">Home</Link>
              </li>

              {/* About */}
              <li className="px-2 lg:px-4 font-semibold text-base lg:text-xl">
                <Link className="text-gray-800 hover:text-orange-600 transition" to="/about">About Us</Link>
              </li>

              {/* Contact */}
              <li className="px-2 lg:px-4 font-semibold text-base lg:text-xl">
                <Link className="text-gray-800 hover:text-orange-600 transition" to="/contact">Contact Us</Link>
              </li>

              {/* Cart */}
              <li className="relative px-2 lg:px-4 font-semibold text-base lg:text-xl">
                <Link
                  to="/cart"
                  className="flex items-center text-gray-800 hover:text-orange-600 transition">
                  <img src={cartIcon} alt="cart" className="w-6 h-6" />

                  {cartItems.length > 0 && (
                    <span className="absolute -top-2.5 -left-1.5 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
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
            <ul className="text-gray-800 space-y-3">

              {/* Online Status */}
              <li className="py-2 border-b border-gray-300 text-gray-800 font-medium">
                Online Status: {onlineStatus ? "✅" : "🔴"}
              </li>

              {/* Home */}
              <li className="py-2 border-b border-gray-300">
                <Link
                  className="block text-gray-800 hover:text-orange-600 transition"
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              {/* About */}
              <li className="py-2 border-b border-gray-300">
                <Link
                  className="block text-gray-800 hover:text-orange-600 transition"
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>

              {/* Contact */}
              <li className="py-2 border-b border-gray-300">
                <Link
                  className="block text-gray-800 hover:text-orange-600 transition"
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </li>

              {/* Cart */}
              <li className="py-2 border-b border-gray-300 relative">
                {/* Cart */}
                  <Link
                    className="text-white hover:text-orange-500 transition flex items-center"
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <img src={cartIcon} alt="cart" className="w-6 h-6" />

                    {cartItems.length > 0 && (
                      <span className="absolute -top-2.5 left-4 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                </li>

              {/* Login button */}
              <li className="py-2 border-b border-gray-300">
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
              <li className="py-2 font-semibold text-gray-900">
                User: {loggedInUser}
              </li>

            </ul>
          </div>
        )}


      </div>
    </div>
  );
};

export default Header;
