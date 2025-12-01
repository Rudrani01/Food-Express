import { useState, useEffect } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchMenu = async () => {
    try {
      console.log("Fetching menu for restaurant ID:", resId);
      
      // Try to fetch restaurant-specific menu first
      let response = await fetch(`${MENU_API}${resId}.json`);
      
      // If restaurant-specific menu doesn't exist (404), use default menu
      if (!response.ok) {
        console.log(`Menu for ${resId} not found, using default menu`);
        response = await fetch(
          "https://raw.githubusercontent.com/Rudrani01/React/main/mock-data/mock-menus/menu-default.json"
        );
      }
      
      const json = await response.json();
      
      console.log("Full API Response:", json.data);
      setResInfo(json.data);
      
      // Get menu cards from index 4
      const menuCards = json.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
      
      console.log("All Menu Cards:", menuCards);
      
      // Filter for ALL category types (ItemCategory AND NestedItemCategory)
      const filteredCategories = menuCards.filter(
        (c) => {
          const type = c.card?.card?.["@type"];
          return (
            type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
            type === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
          );
        }
      );
      
      console.log("Filtered Categories:", filteredCategories);
      setCategories(filteredCategories);
      
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  useEffect(() => {
    if (resId) {
      fetchMenu();
    }
  }, [resId]); // Re-fetch when resId changes

  return { resInfo, categories };
};

export default useRestaurantMenu;