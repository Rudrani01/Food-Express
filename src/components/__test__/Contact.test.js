import { render, screen } from "@testing-library/react"
import Contact from "../Contact";
import "@testing-library/jest-dom";

// contains multiple tests
describe("Contact Us Page Test Case", () => {

     // beforeAll(() => {
  //   console.log("Before All");
  // });

  // beforeEach(() => {
  //   console.log("Before Each");
  // });

  // afterAll(() => {
  //   console.log("After All");
  // });

  // afterEach(() => {
  //   console.log("After Each");
  // });

    it("Should load contact us component", () => {
        render(<Contact />);

        const heading = screen.getByRole("heading");

        // Assertion
        expect(heading).toBeInTheDocument();
    });

    it("Should load button inside Contact component", () => {
        render(<Contact />);

        const button = screen.getByRole("button");

        // Assertion
        expect(button).toBeInTheDocument();
    });

    it("Should load input name inside Contact component", () => {
        render(<Contact />);

        const inputName = screen.getByPlaceholderText("name");

        // Assertion
        expect(inputName).toBeInTheDocument();
    });

    it("Should load 2 input boxes on the Contact component", () => {
        render(<Contact />);

        // Querying
        const inputBoxes = screen.getAllByRole("textbox");

        //console.log(inputBoxes.length);

        // Assertion

        expect(inputBoxes.length).toBe(2);
    });
});




// test('Should load contact us component ', () => {
//     // render to the js dom
//     render(<Contact />);

//     // screen method -- object comes from react testing lib
//     const heading = screen.getByRole("heading");

//     expect(heading).toBeInTheDocument();

// })


// test('Should load button inside contact component ', () => {
//     // render to the js dom
//     render(<Contact />);

//     // screen method -- object comes from react testing lib
//     const button = screen.getByRole("button");

//     expect(button).toBeInTheDocument();

// })
