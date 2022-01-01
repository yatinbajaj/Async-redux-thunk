import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://foodapp-46d5a-default-rtdb.firebaseio.com/cart.json")
            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();
            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(
                
                cartActions.replaceCart({
                  items: cartData.items || [],
                  totalQuantity: cartData.totalQuantity,
                })
            );
            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Data fetched successfully!",
                })
            );
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "some thing bad happened",
                })
            );
        }
    }
}

// Action creator custom action creator
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: "Pending",
                title: "Sending.......",
                message: "Sending Cart Data!",
            })
        );

        const sendRequest = async() => {
            const response = await fetch(
                "https://foodapp-46d5a-default-rtdb.firebaseio.com/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify(cart),
                }
            );

            if (!response.ok) {
                throw new Error("some thing bad happened");
            }

            
        };
        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Sent cart data successfully!",
                })
            );
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "some thing bad happened",
                })
            );
        }
    };
};