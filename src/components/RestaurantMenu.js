import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  
  // // ADD THESE TWO LINES HERE
  // console.log("resId from URL params:", resId);
  // console.log("Type of resId:", typeof resId);
  
  const { resInfo, categories } = useRestaurantMenu(resId);
  
  // State to control which accordion is open (single index, not array)
  // null means all closed, number means that index is open
  const [showIndex, setShowIndex] = useState(null);

  // console.log("Current showIndex:", showIndex);

  // if (resInfo === null) return <Shimmer />;

  // Get restaurant info
  const restaurantInfo = resInfo?.cards?.[2]?.card?.card?.info || {};
  const { name, cuisines, costForTwoMessage } = restaurantInfo;

  return (
    <div className="text-center">
      {/* Restaurant header */}
      <h1 className="font-bold my-6 text-2xl">{name || "Restaurant Name"}</h1>
      <p className="font-bold text-lg">
        {cuisines?.join(", ") || "Cuisines"} - {costForTwoMessage || "Cost info"}
      </p>

      {/* Categories with accordion functionality - Only one accordion open at a time */}
      {categories.length === 0 ? (
        <p>No menu categories available</p>
      ) : (
        categories.map((category, index) => (
          <RestaurantCategory
            key={index}
            data={category?.card?.card}
            // Show items only if this index matches the currently open index
            showItems={index === showIndex}
            // When clicked, set this index as the open one (closes others automatically)
            onToggle={() => {
              console.log("Clicking index:", index);
              console.log("Before - showIndex:", showIndex);
              // If clicking the already open accordion, close it (set to null)
              // Otherwise, open the clicked one (set to its index)
              setShowIndex(showIndex === index ? null : index);
            }}
          />
        ))
      )}
    </div>
  );
};

export default RestaurantMenu;