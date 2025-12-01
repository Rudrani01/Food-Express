import { useSelector } from "react-redux";
import ItemList from "./ItemList";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";


const Cart = () => {

    // to read the cart from the store -- subscribe
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);

    const dispatch = useDispatch();

    const handleClearcart = () => {
        dispatch(clearCart());
    }

return <div className="text-center m-2 sm:m-4 p-2 sm:p-4">
        <h1 className="text-xl sm:text-2xl font-bold">Cart</h1>
        <div className="w-full sm:w-10/12 lg:w-6/12 m-auto">
            <button className="p-2 m-2 bg-black text-white rounded-lg text-sm sm:text-base hover:bg-gray-800 transition-colors"
                onClick={handleClearcart}
            >
                Clear Cart
            </button>
            {cartItems.length === 0 && <h1 className="text-base sm:text-lg mt-4">Cart is Empty. Add items to the cart</h1>}
            {/* <ItemList items={cartItems} /> */}
            {/* Pass showQuantity=true so quantity appears in Cart */}
            <ItemList items={cartItems} showQuantity={true} />
        </div>
    </div>
};

export default Cart;