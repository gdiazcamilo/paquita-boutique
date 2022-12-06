/* eslint-disable testing-library/no-debugging-utils */
import { screen, renderWithProviders } from "../../test-utils/test-utils";
import CartIcon from "./cart-icon.component";

describe("Cart Icon is a clickable element to show a preview of the items", () => {
  it("shows the number of items in the cart", () => {
    const items = [{ quantity: 1 }, { quantity: 2 }, { quantity: 5 }];
    renderWithProviders(<CartIcon />, {
      preloadedState: { cart: { cartItems: items } },
    });

    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("alternative text have the item count", () => {
    const items = [{ quantity: 1 }, { quantity: 2 }, { quantity: 5 }];
    renderWithProviders(<CartIcon />, {
      preloadedState: { cart: { cartItems: items } },
    });

    expect(screen.getByAltText("[ 8 ]")).toBeInTheDocument();
  });
});
