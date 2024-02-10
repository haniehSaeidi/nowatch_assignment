import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BreedPage from "../pages/breed/[breedName]";
import * as nextRouter from "next/router";
import * as dogsApi from "api/dogsApi";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("api/dogsApi", () => ({
  fetchDogBreedImages: jest.fn(),
}));

describe("BreedPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (nextRouter.useRouter as jest.Mock).mockReturnValue({
      query: { breedName: "labrador" },
    });

    (dogsApi.fetchDogBreedImages as jest.Mock).mockResolvedValue({
      message: [
        "https://example.com/dog1.jpg",
        "https://example.com/dog2.jpg",
        "https://example.com/dog3.jpg",
      ],
    });
  });

  it("renders breed images after fetching", async () => {
    render(<BreedPage />);

    await waitFor(() => {
      expect(screen.getAllByRole("img")).toHaveLength(3);
    });
  });

  it('handles "Show more" functionality', async () => {
    render(<BreedPage />);

    await waitFor(() => {
      expect(screen.getAllByRole("img")).toHaveLength(3);
    });

    const showMoreButton = screen.queryByText("Show more");
    if (showMoreButton) {
      showMoreButton.click();

      await waitFor(() => {
        expect(screen.getAllByRole("img").length).toBeGreaterThan(3);
      });
    }
  });
});
