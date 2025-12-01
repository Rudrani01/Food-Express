import { CDN_URL } from "../utils/constants";

function RestaurantCard(props) {
  // const {resName, cuisine} = props;
  const { resData } = props;
  // console.log(resData);

  // optional chaining
  const {
    cloudinaryImageId, // restaurant image
    name,              // restaurant name
    avgRating,         // average rating
    cuisines,          // list of cuisines
    costForTwo,        // cost info
    sla                // delivery info
  } = resData?.info || {}; // use info instead of data

  // Get the restaurant ID
  const restaurantId = resData?.info?.id;
  // console.log("Restaurant ID in card:", restaurantId);

  return (
    <div 
    data-testid="resCard" 
    className="res-card m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200 transform transition-all duration-200 hover:scale-95 hover:shadow-lg cursor-pointer">
      <img
        className="res-logo rounded-lg"
        alt="res-logo"
        src={cloudinaryImageId ? CDN_URL + cloudinaryImageId : ""}
      />
      <h3 className="font-bold py-4 text-lg">{name || "No Name"}</h3>
      <h4>{cuisines ? cuisines.join(", ") : "N/A"}</h4>
      <h4>{avgRating ? `⭐${avgRating} stars` : "No rating"}</h4>
      <h4>{costForTwo || "Cost info unavailable"}</h4>
      <h4>{sla?.deliveryTime ? `${sla.deliveryTime} minutes` : "N/A"}</h4>
    </div>
  );
}

// Higher Order Component
export const withPromotedLabel = (Component) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg z-10">
          Promoted
        </label>
        <Component {...props} />
      </div>
    );
  };
};

export default RestaurantCard;