import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BooksLayout } from "../BooksLayout";
import { assert, describe, expect, it, vi } from "vitest";

vi.mock("axios");

describe("BooksLayout", () => {
  it("fetches books from Google Books API and displays them", async () => {
    const mockedBooks = [
      {
        id: "1",
        volumeInfo: {
          title: "Book 1",
          authors: ["Author 1"],
          imageLinks: {
            thumbnail:
              "http://books.google.com/books/content?id=Oi9vfDvIuBUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          },
        },
      },
      {
        id: "2",
        volumeInfo: {
          title: "Book 2",
          authors: ["Author 2"],
          imageLinks: {
            thumbnail:
              "http://books.google.com/books/content?id=tMbCQ7CM9wAC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          },
        },
      },
    ];

    //@ts-ignore
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { items: mockedBooks } })
    );

    render(<BooksLayout />);

    await userEvent.click(screen.getByText("Fiction"));

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    const bookList = await screen.findByTestId("bookList");
    expect(bookList).toBeInTheDocument();

    const books = await screen.findAllByTestId("book");
    expect(books).toHaveLength(2);
  });

  it("fetches books from Google Books API and fails", async () => {
    //@ts-ignore
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

    render(<BooksLayout />);

    await userEvent.click(screen.getByText("Fiction"));

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    const error = await screen.findByText(/Oops... something went wrong/);
    expect(error).toBeInTheDocument();
  });
});
