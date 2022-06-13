import cartReducer from "./cart.reducer";
import * as cartActions from "./cart.actions";

const initialState = {
  visible: false,
  cartItems: [],
};

it("shows cart preview when hidden", () => {
  expect(
    cartReducer(initialState, cartActions.toggleCartPreview()).visible
  ).toBe(true);
});

it("hides cart preview when hidden", () => {
  expect(
    cartReducer(
      { ...initialState, visible: true },
      cartActions.toggleCartPreview()
    ).visible
  ).toBe(false);
});

it("add new item to cart", () => {
  const newItem = { id: 1, name: "hat", price: 22.0 };

  expect(
    initialState.cartItems.find((i) => i.id === newItem.id)
  ).toBeUndefined();

  expect(
    cartReducer(initialState, cartActions.addItem(newItem)).cartItems.find(
      (i) => i === newItem.id
    )
  ).toBeDefined();
});

it("add set quantity to 1 for newly added items to cart", () => {
  const newItem = { id: 1, name: "hat", price: 22.0 };

  expect(
    initialState.cartItems.find((i) => i.id === newItem.id)
  ).toBeUndefined();

  expect(
    cartReducer(initialState, cartActions.addItem(newItem)).cartItems[0].id
  ).toEqual({ ...newItem, quantity: 1 });
});
