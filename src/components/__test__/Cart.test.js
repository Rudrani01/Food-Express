import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import MOCK_DATA from "../mocks/mockResMenu.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

// -------------------------
// Mock ONLY useParams
// -------------------------
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    resId: "123456"
  })
}));

// -------------------------
// Test: Load Restaurant Menu Component
// -------------------------
// it("Should Load Restaurant Menu Component", async () => {
//   await act(async () =>
//     render(
//       <BrowserRouter>
//         <Provider store={appStore}>
//           <Header />
//           <RestaurantMenu />
//         </Provider>
//       </BrowserRouter>
//     )
//   );

//   // ✅ CHECK: Mock data mein jo actual text hai wo dhundo
//   // Example: Restaurant name ya category name
//   const accordionHeader = screen.getByText(/Recommended/i); // MOCK_DATA ke hisaab se change karo
//   expect(accordionHeader).toBeInTheDocument();
// });

// it("Should expand accordion on click", async () => {
//   await act(async () =>
//     render(
//       <BrowserRouter>
//         <Provider store={appStore}>
//           <Header />
//           <RestaurantMenu />
//         </Provider>
//       </BrowserRouter>
//     )
//   );

//   // Accordion header click karo
//   const accordionHeader = screen.getByText(/Recommended/i);
//   fireEvent.click(accordionHeader);

//   // Items visible hone chahiye
//   const foodItems = screen.getAllByTestId("foodItems"); // data-testid add karo component mein
//   expect(foodItems.length).toBeGreaterThan(0);
// });