import { Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { screen, renderWithRouterAndProviders } from "test-utils/test-utils";
import Directory from "./directory.component";

describe("directory component", () => {
  const categories = {
    hats: {
      id: 1,
      imageUrl: "hats.png",
      title: "Hats",
      linkUrl: "/shop/hats",
      size: "small",
    },
    jackets: {
      id: 2,
      imageUrl: "jackets.png",
      title: "Jackets",
      linkUrl: "/shop/jackets",
    },
  };

  it("shows the categories", () => {
    renderWithRouterAndProviders(<Directory />, {
      preloadedState: {
        catalog: {
          collections: categories,
        },
      },
    });

    const hatsMenuItem = screen.getByRole("heading", {
      level: 2,
      name: new RegExp(categories.hats.title, "i"),
    });
    const jacketsMenuItem = screen.getByRole("heading", {
      level: 2,
      name: new RegExp(categories.jackets.title, "i"),
    });
    expect(hatsMenuItem).toBeInTheDocument();
    expect(jacketsMenuItem).toBeInTheDocument();
  });

  it("navigates to category page", () => {
    renderWithRouterAndProviders(
      <Routes>
        <Route path='collections' element={<Directory />} />
        <Route path='shop/hats' element={<h1>Hats page</h1>} />
      </Routes>,

      {
        preloadedState: {
          catalog: {
            collections: categories,
          },
        },
        routerOptions: { initialEntries: ["/collections"] },
      }
    );

    // We're not in Hats' page
    expect(
      screen.queryByRole("heading", { level: 1, name: "Hats page" })
    ).toBeNull();

    // Click link to hats' page
    const hatsMenuItem = screen.getByRole("heading", {
      level: 2,
      name: new RegExp(categories.hats.title, "i"),
    });
    const hatsContainer = hatsMenuItem.parentElement.parentElement;
    userEvent.click(hatsContainer);

    // Now we're in hats' page
    expect(
      screen.getByRole("heading", { level: 1, name: "Hats page" })
    ).toBeInTheDocument();
  });
});
