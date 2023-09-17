import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BooksLayout } from "../BooksLayout";
import { describe, expect, it, vi } from "vitest";

//TODO: Complete flow

vi.mock("axios");

describe("BooksLayout", () => {
  it("fetches books from Google Books API and displays them", async () => {
    const mockedBooks = [
      {
        id: "1",
        volumeInfo: {
          title: "Book 1",
          authors: ["Author 1"],
        },
      },
      {
        id: "2",
        volumeInfo: {
          title: "Book 2",
          authors: ["Author 2"],
        },
      },
    ];

    //@ts-ignore
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: mockedBooks } })
    );

    render(<BooksLayout />);

    await userEvent.click(screen.getByText("Fiction"));

    const loader = screen.getByTestId("loader");

    expect(loader).toBeInTheDocument();

    const bookList = await screen.findByTestId("bookList");

    //TODO: 1. use the mock api and make sure you show 2 Books
    //      2. Create an error and make sure you see the error component

    screen.debug();
  });
});
