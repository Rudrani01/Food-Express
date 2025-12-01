import { useState, useEffect } from "react";

const useRestaurants = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true); // loading for shimmer 

  console.log("Body Rendered", listOfRestaurants);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://raw.githubusercontent.com/Rudrani01/React/refs/heads/main/mock-data/swiggy-api.json"
      );

      const json = await data.json();

      const restaurants =
        json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);

    
    } catch (err) {
      console.error("Failed to load restaurants:", err);
      setListOfRestaurants([]);
      setFilteredRestaurant([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Return only the data and state management functions
  return {
    listOfRestaurants,
    filteredRestaurant,
    setFilteredRestaurant,
    searchText,
    setSearchText,
    loading,
  };
};

export default useRestaurants;