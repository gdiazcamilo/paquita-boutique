import { screen, renderWithProviders } from "../../test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import CheckoutItem from "./checkout-item.component";

describe("Checkout item shows the items added to the cart in the checkout screen", () => {
  it("shows the item details", () => {
    const item = {
      id: 1,
      name: "Blue jacket",
      quantity: 1,
      price: 25,
      imageUrl: "blue_jacket.png",
    };
    renderWithProviders(<CheckoutItem cartItem={item} />);

    expect(screen.getByRole("img").src).toContain(item.imageUrl);
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.quantity.toString())).toBeInTheDocument();
    expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
  });
});
