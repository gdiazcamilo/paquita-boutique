/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import * as router from "react-router";
import {
  render,
  renderWithProviders,
  screen,
} from "../../test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import CartDropdownWrapper from "./cart-dropdown.connected.component";
import Header from "../header/header.component";

describe("cart dropdown component", () => {
  it("show empty cart message when no items", () => {
    renderWithProviders(
      <router.MemoryRouter>
        <CartDropdownWrapper />
      </router.MemoryRouter>
    );
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("renders a list of cart items", () => {
    const cartItems = [
      {
        id: 1,
        name: "Black hat",
        price: 22,
        quantity: 2,
        imageUrl: "black_hat.jpg",
      },
      {
        id: 2,
        name: "White hat",
        price: 22,
        quantity: 1,
        imageUrl: "white_hat.jpg",
      },
    ];

    renderWithProviders(
      <router.MemoryRouter>
        <CartDropdownWrapper />
      </router.MemoryRouter>,
      {
        preloadedState: { cart: { cartItems: cartItems } },
      }
    );

    expect(screen.getByText(cartItems[0].name)).toBeInTheDocument();
    expect(screen.getByText(cartItems[1].name)).toBeInTheDocument();
  });

  it("cart preview hides when click 'Show All' button", () => {
    const cartItem = {
      id: 1,
      name: "Red hat",
      quantity: 1,
      price: 23,
      imageUrl: "red_hat.png",
    };

    renderWithProviders(
      <router.MemoryRouter>
        {/* <CartDropdownWrapper /> */}
        <Header />
      </router.MemoryRouter>,
      {
        preloadedState: {
          cart: {
            cartItems: [cartItem],
            visible: true,
          },
        },
      }
    );

    expect(screen.getByText("Red hat")).toBeInTheDocument();
    userEvent.click(screen.getByRole("button"));
    expect(screen.queryByText("Red hat")).toBeNull();
  });
});
