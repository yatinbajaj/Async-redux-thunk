import { createSlice } from "@reduxjs/toolkit";

const init = {
    items: [],
    totalQuantity: 0,
    cartChanged:false
};

const cartSlice = createSlice({
    name: "CART",
    initialState: init,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            state.cartChanged = true;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    name: newItem.name,
                    totalPrice: newItem.price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
            state.cartChanged = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
        replaceCart(state,action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        }
    },
});



export const cartActions = cartSlice.actions;
export const cartReducers = cartSlice.reducer;
