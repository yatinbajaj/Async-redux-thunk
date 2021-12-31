import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/slice/ui-slice';
import { useSelector, useDispatch } from 'react-redux';

let isInitial = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const sendCartData = async () => {
    dispatch(uiActions.showNotification({
      status: 'Pending',
      title: 'Sending.......',
      message: 'Sending Cart Data!'
    }))
    const response = await fetch('https://foodapp-46d5a-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart)
    });

    if (!response.ok) {
      throw new Error('some thing bad happened');
    }

    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success!',
      message: 'Sent cart data successfully!'
    }))

  }
  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return;
    }
    sendCartData().catch((err) => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'some thing bad happened'
      }))
    })

  }, [cart]);

  return (
    <Fragment>
      {notification &&(
        <Notification
          status={notification.status}
          message={notification.message}
          title={notification.title}
        />)}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>

  );
}

export default App;
