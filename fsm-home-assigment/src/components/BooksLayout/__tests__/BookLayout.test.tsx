import { rest } from "msw";

import axios from "axios";
import userEvent from "@testing-library/user-event";
import {
  queryByTestId,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BooksLayout } from "../BooksLayout";
import { assert, describe, expect, it, vi } from "vitest";
import { setupServer } from "msw/node";
import { API_KEY, BASE_BOOKS_URL } from "../../../utils/constants";

const server = setupServer(
  // Describe network behavior with request handlers.
  // Tip: move the handlers into their own module and
  // import it across your browser and Node.js setups!

  rest.get(`https://www.googleapis.com/books/v1`, (req, res, ctx) => {
    console.log("oren", ctx);
    return res(
      ctx.status(200),
      ctx.json({
        items: [
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
        ],
      })
    );
  })
);

// Tests lifecycle

// Enable request interception.
beforeAll(() => server.listen());

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => server.resetHandlers());

// Don't forget to clean up afterwards.
afterAll(() => server.close());

describe("BooksLayout", () => {
  it("fetches books from Google Books API and displays them", async () => {
    render(<BooksLayout />);

    await userEvent.click(screen.getByText("Fiction"));

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByTestId("loader"));

    const bookList = await screen.findByTestId("bookList");
    expect(bookList).toBeInTheDocument();

    const books = await screen.findAllByTestId("book");
    expect(books).toHaveLength(2);
  });
});
