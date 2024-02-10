import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../pages/index";
import * as dogsApi from "api/dogsApi";

jest.mock("api/dogsApi");

const mockedFetchRandomDog = dogsApi.fetchRandomDog as jest.MockedFunction<
  typeof dogsApi.fetchRandomDog
>;

describe("HomePage Component", () => {
  beforeEach(() => {
    mockedFetchRandomDog.mockClear();
  });

  it("renders correctly", () => {
    render(<HomePage />);
    expect(
      screen.getByText("Discover a new furry friend with just a click!")
    ).toBeInTheDocument();
  });

  it("fetches and displays a new dog image and breed on button click", async () => {
    mockedFetchRandomDog.mockResolvedValue({
      message: "http://example.com/dog.jpg",
    });

    render(<HomePage />);

    fireEvent.click(screen.getByText(/generate new dog/i));

    await waitFor(() => {
      expect(screen.getByAltText("dog")).toBeInTheDocument();
    });

    expect(mockedFetchRandomDog).toHaveBeenCalled();
  });
});
