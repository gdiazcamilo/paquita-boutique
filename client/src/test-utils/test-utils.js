import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import rootReducer from "../redux/rootReducer";
import { MemoryRouter } from "react-router-dom";

const setupStore = (preloadedState) => {
  return configureStore({ reducer: rootReducer, preloadedState });
};

function withProviders(
  ui,
  { preloadedState = {}, store = setupStore(preloadedState) } = {}
) {
  return <Provider store={store}>{ui}</Provider>;
}

function withMemoryRouter(ui, options = {}) {
  return <MemoryRouter {...options}>{ui}</MemoryRouter>;
}

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return withProviders(children, preloadedState, store);
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

function renderWithMemoryRouter(ui, options = {}, ...renderOptions) {
  return render(withMemoryRouter(ui, options), { ...renderOptions });
}

function renderWithRouterAndProviders(
  ui,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    routerOptions = {},
  } = {},
  ...renderOptions
) {
  return render(
    withProviders(withMemoryRouter(ui, routerOptions), {
      preloadedState,
      store,
    }),
    { ...renderOptions }
  );
}

export {
  renderWithProviders,
  renderWithMemoryRouter,
  renderWithRouterAndProviders,
};
export * from "@testing-library/react";
