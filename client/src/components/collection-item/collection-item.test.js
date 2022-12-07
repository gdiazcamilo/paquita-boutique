import { screen, renderWithProviders } from "test-utils/test-utils";
import CollectionItem from "./collection-item.component";

describe("collection-item component show the item to buy", () => {
  it("shows the name, price and image", () => {
    const item = {
      name: "Black pants",
      price: 39.99,
      imageUrl: "black_pants.png",
    };

    renderWithProviders(<CollectionItem item={item} />);

    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.price)).toBeInTheDocument();
    expect(document.getElementsByClassName("image")[0]).toBeInTheDocument();
  });
});
