import { render, screen } from "@testing-library/react";
import RestaurantCard, { withPromotedLabel } from "../RestaurantCard";
import MOCK_DATA from "../mocks/resCardMock.json";
import "@testing-library/jest-dom";

it("Should render RestaurantCard component with props Data", () => {
    render(<RestaurantCard resData={MOCK_DATA} />);

    const name = screen.getByText("Pizza Hut");

    expect(name).toBeInTheDocument();
});


it("should render RestaurantCard component with Promoted Label", () => {
    // Home Work - test HOC : withPromtedLabel()

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    // Step 2: Render the promoted version of the card with mock data
    render(<RestaurantCardPromoted resData={MOCK_DATA} />);

    // Step 3: Check if the "Promoted" label is present in the document
    const withpromotedLabel = screen.getByText("Promoted");

    // Step 4: Assert that the promoted label exists
    expect(withpromotedLabel).toBeInTheDocument();
});