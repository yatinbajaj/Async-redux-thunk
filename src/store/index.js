import { configureStore } from '@reduxjs/toolkit';
import { cartReducers } from './slice/cart-slice';
import { uiReducers } from './slice/ui-slice';

const store = configureStore({ reducer: { ui: uiReducers, cart: cartReducers } });

export default store;
