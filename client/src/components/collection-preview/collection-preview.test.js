import { MemoryRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import userEvent from "@testing-library/user-event";

import { screen, renderWithProviders, render } from "test-utils/test-utils";

import { CollectionPreview } from "./collection-preview.component";

describe("collection-preview shows a preview of the items in the collection", () => {
  it("renders anchor with collection link and name", () => {
    render(
      <MemoryRouter>
        <CollectionPreview title='jackets' linkUrl='/shop/jackets' items={[]} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/shop/jackets");
    expect(link).toHaveTextContent(/jackets/i);
  });

  it("limits the preview to 4 items", () => {
    const collection = [
      { id: 1, name: "Blue jacket", price: 39.99 },
      { id: 2, name: "Leather jacket", price: 69.99 },
      { id: 3, name: "Jean jacket", price: 59.99 },
      { id: 4, name: "Black hoodie", price: 39.99 },
      { id: 5, name: "Brown jacket", price: 39.99 },
    ];

    renderWithProviders(
      <MemoryRouter>
        <CollectionPreview
          title='jackets'
          linkUrl='/shop/jackets'
          items={collection}
        />
      </MemoryRouter>
    );

    let i = 0;
    for (i = 0; i < 4; i++) {
      expect(screen.getByText(collection[i].name)).toBeInTheDocument();
    }

    expect(screen.queryByText(collection[i])).toBeNull();
  });

  it("goes to collection page when click the collection link", () => {
    render(
      <MemoryRouter initialEntries={["/shop"]}>
        <Routes>
          <Route
            path='/shop'
            element={
              <CollectionPreview title='jackets' linkUrl='jackets' items={[]} />
            }
          />
          <Route path='/shop/jackets' element={<h1>Jackets shop page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole("link", { name: /jacket/i }));
    expect(screen.getByText("Jackets shop page")).toBeInTheDocument();
  });
});
