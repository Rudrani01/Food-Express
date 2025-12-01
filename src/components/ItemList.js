import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice"; // import removeItem
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items, dummy, showQuantity = false }) => {

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch an action 
    // whatever passing from here will go to payload
    dispatch(addItem(item));
  };

  // handle removing a single item
  const handleRemoveItem = (item) => {
    dispatch(removeItem({ id: item.card.info.id }));
  };

  //  group items by id to show quantity in UI
  const groupedItems = items.reduce((acc, item) => {
    const id = item.card.info.id;
    if (acc[id]) {
      acc[id].quantity += 1;
    } else {
      acc[id] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});
  const groupedArray = Object.values(groupedItems);

  return (
    <div>
      {groupedArray.map((item, index) => (
        <div
          // let's add one item multiple times
          key={item.card.info.id + "-" + index}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
        >

          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
            {/* Updated: display quantity */}
            {showQuantity && <p className="text-sm font-bold">Quantity: {item.quantity}</p>}
          </div>

          {/* Right side: Image on top, Add/Remove buttons below */}
          <div className="w-3/12 p-4 flex flex-col items-center">
            <img
              src={CDN_URL + item.card.info.imageId}
              className="w-full mb-2 rounded-lg object-cover aspect-[4/3]"
            />

            {/* Add item button */}
            <button
              className="p-1 text-xs rounded-lg  bg-white text-black border-2 border-green-600 shadow-md w-full transition-all duration-200 
                hover:scale-105 hover:bg-green-600 hover:text-white  active:scale-95 active:bg-green-700"
              onClick={() => handleAddItem(item)}
            >
              Add +
            </button>

            {/* Remove one item button */}
            <button
              className="p-1 text-xs mt-1 rounded-lg bg-white text-black border-solid border-2 border-red-500 shadow-md w-full  transition-all duration-200 
                hover:scale-105 hover:bg-red-600 hover:text-white  active:scale-95 active:bg-red-600"
              onClick={() => handleRemoveItem(item)}
            >
              Remove -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
