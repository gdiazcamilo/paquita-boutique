import { isReactNative } from "@firebase/util";
import { selectCartItemCount, selectCartTotalPrice } from "./cart.selectors";

it("returns cart items count", () => {
  const state = {
    cart: {
      cartItems: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 2 },
      ],
    },
  };

  expect(selectCartItemCount(state)).toBe(3);
});

it("returns total price", () => {
  const state = {
    cart: {
      cartItems: [
        { id: 1, quantity: 1, price: 22 },
        { id: 2, quantity: 2, price: 10 },
      ],
    },
  };

  expect(selectCartTotalPrice(state)).toBe(42);
});
