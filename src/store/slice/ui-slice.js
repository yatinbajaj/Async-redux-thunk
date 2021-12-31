import {createSlice} from '@reduxjs/toolkit'

const init = {
    cartIsVisible: false,
    notification:null
};

const uiSlice = createSlice({
    name: 'UI',
    initialState: init,
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification(state,action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            }            
        }
    }
});

export const uiActions = uiSlice.actions;
export const uiReducers = uiSlice.reducer;
