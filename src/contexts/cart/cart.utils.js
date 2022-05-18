export const addItemToCart = (cartItems, itemToAdd) => {
  console.log("adding item to cart");
  const itemIsInCart = cartItems.find((item) => item.id === itemToAdd.id);
  if (itemIsInCart) {
    return cartItems.map((item) =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    return [...cartItems, { ...itemToAdd, quantity: 1 }];
  }
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
  return cartItems.filter((item) => item.id !== itemToRemove);
};

export const decreaseItemQty = (cartItems, itemId) => {
  return cartItems.map((item) =>
    item.id === itemId && item.quantity > 1
      ? { ...item, quantity: --item.quantity }
      : item
  );
};

export const getCartItemsCount = (cartItems) =>
  cartItems.reduce((itemCount, cartItem) => itemCount + cartItem.quantity, 0);

export const getCartTotal = (cartItems) =>
  cartItems.reduce(
    (accumulatedPrice, cartItem) =>
      accumulatedPrice + cartItem.quantity * cartItem.price,
    0
  );
