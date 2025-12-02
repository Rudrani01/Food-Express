import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useRestaurants from "../utils/useRestaurants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useContext, useState, useEffect } from "react";
import searchIcon from "url:../images/search.png"; // Import your search icon

// Create the promoted component using the HOC
const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

const Body = () => {
  const onlineStatus = useOnlineStatus();

  const {
    listOfRestaurants,
    filteredRestaurant,
    setFilteredRestaurant,
    searchText,
    setSearchText,
  } = useRestaurants();

  const { loggedInUser, setUserName } = useContext(UserContext);

  // State to control Shimmer visibility
  const [showShimmer, setShowShimmer] = useState(true);

  // Keep shimmer visible for a short delay even after data is loaded
  useEffect(() => {
    if (listOfRestaurants && listOfRestaurants.length > 0) {
      const timer = setTimeout(() => setShowShimmer(false), 2000); // 2 seconds
      return () => clearTimeout(timer);
    }
  }, [listOfRestaurants]);

  if (onlineStatus === false)
    return (
      <div className="flex justify-center items-center min-h-[40vh] px-4">
        <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-sm text-center max-w-md">
          <h1 className="font-semibold text-lg sm:text-xl">
            🚫 You're Offline
          </h1>
          <p className="mt-2 text-sm sm:text-base">
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    );

  // Search Logic (reusable for button + Enter key)
  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((res) => {
      const searchLower = searchText.toLowerCase();

      // Search in restaurant name
      const nameMatch = res.info.name.toLowerCase().includes(searchLower);

      // Search in cuisines array
      const cuisineMatch = res.info.cuisines?.some((cuisine) =>
        cuisine.toLowerCase().includes(searchLower)
      );

      return nameMatch || cuisineMatch;
    });

    setFilteredRestaurant(filtered);
  };

  return (
    <div className="body m-3 px-4 py-4 sm:px-6 lg:px-10">
      <div className="filter border-2 border-slate-400 flex flex-col md:flex-row justify-center gap-4 md:gap-8 p-4 bg-gray-50 rounded-lg shadow-sm">

        {/* Search Box with Icon */}
        <div className="search flex flex-col sm:flex-row gap-1 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">

            {/* Search Icon */}
            <img
              src={searchIcon}
              alt="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70 pointer-events-none"
            />

            {/* Input */}
            <input
              type="text"
              data-testid="searchInput"
              className="search-box border border-gray-300 w-full pl-10 pr-3 py-2 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-green-300 outline-none"
              value={searchText || ""}
              onChange={(e) => setSearchText(e.target.value)}
              // Enable Enter key search
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </div>

          {/* Search Button */}
          <button
            className="px-5 py-2 border border-green-400 bg-green-100 hover:bg-green-200 transition rounded-lg text-sm font-medium shadow-sm"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Top Rated Button */}
        <div className="search">
          <button
            className="px-5 py-2 border border-yellow-400 bg-yellow-100 hover:bg-yellow-200 transition rounded-lg text-sm font-medium shadow-sm w-full sm:w-auto"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.3
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            ⭐ Top Rated
          </button>
        </div>

        {/* Username Input */}
        <div className="search flex flex-col md:flex-row gap-3 items-start md:items-center font-semibold">
          <label className="text-sm">UserName:</label>
          <input
            className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm w-full md:w-52 text-sm focus:ring-2 focus:ring-blue-300 outline-none"
            value={loggedInUser || ""}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

      </div>

      {/* Restaurants Grid or Shimmer */}
      <div className="res-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(showShimmer || !filteredRestaurant.length) ? (
          Array(12).fill("").map((_, i) => (
            <div
              key={i}
              className="shimmer-card m-4 p-4 w-[250px] h-[300px] bg-gray-300 rounded-lg animate-pulse"
            ></div>
          ))
        ) : (
          filteredRestaurant.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
              className="hover:scale-[1.03] transition-transform duration-200"
            >
              {restaurant.info.promoted ? (
                <RestaurantCardPromoted resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
