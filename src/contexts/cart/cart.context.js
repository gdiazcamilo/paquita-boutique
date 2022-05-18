import { useState, createContext, useEffect } from "react";

import {
  addItemToCart,
  removeItemFromCart,
  decreaseItemQty,
  getCartItemsCount,
  getCartTotal,
} from "./cart.utils";

export const CartProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));

  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));

  const decreaseItemQuantity = (item) =>
    setCartItems(decreaseItemQty(cartItems, item));

  const toggleCartPreview = () => setVisible(!visible);

  const getCartTotalPrice = () => getCartTotal(cartItems);

  useEffect(() => {
    setItemCount(getCartItemsCount(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        visible,
        cartItems,
        itemCount,
        toggleCartPreview,
        addItem,
        removeItem,
        decreaseItemQuantity,
        getCartTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const CartContext = createContext({
  visible: false,
  cartItems: [],
  itemCount: 0,
  toggleCartPreview: () => {},
  addItem: () => {},
  removeItem: () => {},
  decreaseItemQuantity: () => {},
  getCartTotalPrice: () => {},
});

export default CartContext;
