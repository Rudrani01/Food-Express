import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../mocks/mockResListData.json";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

// dummy fetch function --> trying to fetch() exactly similar to that our browser gives us
// gives mock fetch function --- returns a promise

// ✅ FIX: reset mocks before each test so state doesn't leak
beforeEach(() => {
  jest.resetAllMocks();

  global.fetch = jest.fn(() => {
      return Promise.resolve({
          json: () => {
              // this promise.resolve actually has data
              return Promise.resolve(MOCK_DATA);
          }
      })
  });
});

it("Should search Res List for burger inout text", async () => {

    // act() --> returns promise
    // returns render
    await act(async () =>
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        )
    );

    const cardsBeforeSearch = await screen.findAllByTestId("resCard");
    expect(cardsBeforeSearch.length).toBe(20);

    const searchBtn = screen.getByRole("button", { name: "Search" });

    const searchInput = screen.getByTestId("searchInput");
    // console.log(searchInput);

    fireEvent.change(searchInput, { target: { value: "burger"}});

    fireEvent.click(searchBtn);

    // screen should load 4 cards
    const cards = await screen.findAllByTestId("resCard");   // ✔️ async render fix

    expect(cards.length).toBe(7);

    // console.log(searchBtn);
    // expect(searchBtn).toBeInTheDocument();
});

it("Should filter Top Rated Restaurant", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const cardsBeforeFilter = await screen.findAllByTestId("resCard");

  expect(cardsBeforeFilter.length).toBe(20);

  const topRatedBtn = screen.getByRole("button", {
    name: "Top Rated Restaurants",
  });
  fireEvent.click(topRatedBtn);

  // ❗ MUST WAIT FOR UI UPDATE
  const cardsAfterFilter = await screen.findAllByTestId("resCard");

  expect(cardsAfterFilter.length).toBe(8);
});
