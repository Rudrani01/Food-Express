import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../utils/cartSlice";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";


// ✅ Fresh store function
const createFreshStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      // Add other reducers if needed
    },
  });
};

describe("Header Component Tests", () => {
  it("Should render Header Component with a login button", () => {
    render(
      <BrowserRouter>
        <Provider store={createFreshStore()}>
          <Header />
        </Provider>
      </BrowserRouter>
    );
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it("Should render Header Component with Cart items 0", () => {
    render(
      <BrowserRouter>
        <Provider store={createFreshStore()}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // ✅ Flexible regex that works for "Cart - (0)" or "Cart (0)"
    const cartText = screen.getByText(/Cart.*\(0\)/i);
    expect(cartText).toBeInTheDocument();
  });

  it("Should render Header Component with Cart item", () => {
    render(
      <BrowserRouter>
        <Provider store={createFreshStore()}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cartItems = screen.getByText(/Cart/i);
    expect(cartItems).toBeInTheDocument();
  });

  it("Should change Login Button to Logout on click", () => {
    render(
      <BrowserRouter>
        <Provider store={createFreshStore()}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
});