import { createSlice } from "@reduxjs/toolkit";

// cartSlice -- big object
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    // multiple small reducers functions for slice --- reducers 
    reducers: {
        addItem: (state, action) => {
            // mutating the state over here
            state.items.push(action.payload);
        },


        // removeItem: (state, action) => {
        //     state.items.pop();
        // },
        removeItem: (state, action) => {
    const idToRemove = action.payload.id;
    // Remove only the first occurrence of the item with this id
    const index = state.items.findIndex(i => i.card.info.id === idToRemove);
    if (index >= 0) {
        state.items.splice(index, 1);
    }
},




        // originalState = {items: ["pizza"]}
        clearCart: (state, action) => {
            // RTK - either mutate the existing state or return a new state
            // state.items.length = 0; // originalState = []

            return { items: [] }; // this new object will be replaced inside originalState = { items: [] }

            // state.items.length = 0; // state = [ ]
        },
    },
});




export const { addItem, removeItem, clearCart } = cartSlice.actions;

// exporting just 1 reducer from it -- reducer
export default cartSlice.reducer;