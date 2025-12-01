import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useRestaurants from "../utils/useRestaurants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useContext } from "react";

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

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection.
      </h1>
    );

  const { loggedInUser, setUserName } = useContext(UserContext);


  if (!listOfRestaurants || listOfRestaurants.length === 0)
    return <Shimmer />;

  return (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            data-testid="searchInput"
            className="search-box border border-solid border-black"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button className="px-4 py-2  border-2 font-semibold border-green-300 bg-green-50 hover:bg-green-300 m-4 rounded-lg"
            onClick={() => {
              const filtered = listOfRestaurants.filter((res) => {
                const searchLower = searchText.toLowerCase();

                // Search in restaurant name
                const nameMatch = res.info.name.toLowerCase().includes(searchLower);

                // Search in cuisines array
                const cuisineMatch = res.info.cuisines?.some(cuisine =>
                  cuisine.toLowerCase().includes(searchLower)
                );

                return nameMatch || cuisineMatch;
              });
              setFilteredRestaurant(filtered);
            }}
          >
            Search
          </button>
        </div>

        <div className="search m-4 p-4 flex items-center">
          <button
            className="filter-btn px-4 py-2 font-semibold border-2 border-yellow-300 bg-yellow-50 rounded-lg hover:bg-yellow-300"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.3
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>

        <div className="search m-4 p-4 flex items-center gap-3 font-semibold">
          <label>UserName : </label>
          <input className="border border-black p-2 rounded-lg"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}></input>
        </div>


      </div>

      <div className="res-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;