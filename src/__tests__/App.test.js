import { screen } from "@testing-library/react";
import App from "../App";
import { renderWithProviders } from "../utils/test-utils";

describe("App.js component", () => {
    test("renders NavBar.js component in App.js", () => {
      renderWithProviders(<App />);
      const image = screen.getByAltText("Return to Home button");
      expect(image).toBeInTheDocument();
    });

    test("renders Posts.js component in App.js", () => {
      renderWithProviders(<App />);
      const textInPostsJS = screen.getByText("Loading Posts");
      expect(textInPostsJS).toBeInTheDocument();
    });

    test("renders Subreddits.js component in App.js", () => {
        renderWithProviders(<App />);
        const textInSubredditsJS = screen.getByText("Subreddits");
        expect(textInSubredditsJS).toBeInTheDocument();
      });

    test("renders ScrollButton.js component in App.js", () => {
      renderWithProviders(<App />);
      const buttonInScrollButtonJS = screen.getByTestId("scroll-button");
      expect(buttonInScrollButtonJS).toBeInTheDocument();
    });
  });


