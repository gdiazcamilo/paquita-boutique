import cartReducer from "./cart.reducer";
import * as cartActions from "./cart.actions";

let initialState = {};

beforeEach(() => {
  initialState = {
    visible: false,
    cartItems: [],
  };
});

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
      (i) => i.id === newItem.id
    )
  ).toBeDefined();
});

it("add set quantity to 1 for newly added items to cart", () => {
  const newItem = { id: 1, name: "hat", price: 22.0 };

  expect(
    initialState.cartItems.find((i) => i.id === newItem.id)
  ).toBeUndefined();

  expect(
    cartReducer(initialState, cartActions.addItem(newItem)).cartItems[0]
  ).toEqual({ ...newItem, quantity: 1 });
});

it("increases quantity when item is in the cart", () => {
  initialState.cartItems.push({
    id: 1,
    name: "hat",
    price: 22.0,
    quantity: 1,
  });

  const newState = cartReducer(
    initialState,
    cartActions.addItem({ id: 1, name: "hat", price: 22.0 })
  );
  expect(newState.cartItems.find((i) => i.id === 1).quantity).toBe(2);
});

it("remove item with quantity greater than 1 from cart", () => {
  initialState.cartItems.push({
    id: 1,
    name: "hat",
    price: 22.0,
    quantity: 3,
  });

  expect(initialState.cartItems.find((i) => i.id === 1)).toBeDefined();

  const newState = cartReducer(initialState, cartActions.removeItem(1));

  expect(newState.cartItems.find((i) => i.id === 1)).toBeUndefined();
});

it("decrease item quantity", () => {
  initialState.cartItems.push({
    id: 1,
    name: "hat",
    price: 22.0,
    quantity: 3,
  });

  const newState = cartReducer(
    initialState,
    cartActions.decreaseItemQuantity(1)
  );

  expect(newState.cartItems.find((i) => i.id === 1).quantity).toBe(2);
});

it("clear cart", () => {
  initialState.cartItems.push({ id: 1 });
  initialState.cartItems.push({ id: 2 });

  expect(
    cartReducer(initialState, cartActions.clearCart()).cartItems.length
  ).toBe(0);
});
