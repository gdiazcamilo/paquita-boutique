/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import {
  render,
  renderWithProviders,
  screen,
} from "../../test-utils/test-utils";

import CartDropDownItem from "./cart-dropdown-item.component";

describe("cart dropdown item", () => {
  it("renders name, price, quantity and image", () => {
    const item = {
      name: "Black hat",
      price: 22.0,
      quantity: 2,
      imageUrl: "black_hat.jpg",
    };

    render(<CartDropDownItem item={item} />);

    screen.debug();

    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${item.quantity} x $${item.price}`)
    ).toBeInTheDocument();
  });
});
