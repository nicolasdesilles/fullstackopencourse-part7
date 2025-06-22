import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";
import CreateNewBlogForm from "../components/CreateNewBlogForm";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

describe("blog rendering", async () => {
  const response = await axios.get(
    "http://localhost:3003/api/blogs/67ba3a1a7f352b4d4bc203bd",
  );
  const blog = response.data;

  test("renders blog title and author by default", async () => {
    render(<Blog blog={blog} />);
    const titleElement = screen.getByTestId("blog-title");
    const authorElement = screen.getByTestId("blog-author");

    expect(titleElement).toHaveTextContent(blog.title);
    expect(authorElement).toHaveTextContent(blog.author);
  });

  test("does not render blog url and likes by default", async () => {
    render(<Blog blog={blog} />);
    const urlElement = screen.getByTestId("blog-url");
    const likesElement = screen.getByTestId("blog-likes");

    expect(urlElement).not.toBeVisible();
    expect(likesElement).not.toBeVisible();
  });

  test("renders blog url and likes when the view button is clicked", async () => {
    const testUser = userEvent.setup();

    render(<Blog blog={blog} />);
    const viewButton = screen.getByTestId("blog-viewbutton");

    await testUser.click(viewButton);

    const urlElement = screen.getByTestId("blog-url");
    const likesElement = screen.getByTestId("blog-likes");

    expect(urlElement).toBeVisible();
    expect(likesElement).toBeVisible();
  });

  test("clicking the like button twice calls the event handler twice", async () => {
    const mockHandler = vi.fn();
    const testUser = userEvent.setup();

    render(<Blog blog={blog} onLikeClicked={mockHandler} />);
    const viewButton = screen.getByTestId("blog-viewbutton");

    await testUser.click(viewButton);

    const likeButton = screen.getByTestId("blog-likebutton");

    expect(likeButton).toBeDefined();

    await testUser.click(likeButton);
    await testUser.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

describe("new blog form", async () => {
  test("adding a blog through the form calls the event handler with the right props", async () => {
    const handleAddNewBlog = vi.fn();
    const user = userEvent.setup();

    render(<CreateNewBlogForm createNewBlogEntry={handleAddNewBlog} />);

    const titleInput = screen.getByTestId("newblogform-titleinput");
    const authorInput = screen.getByTestId("newblogform-authorinput");
    const urlInput = screen.getByTestId("newblogform-urlinput");
    const submitButton = screen.getByTestId("newblogform-submitbutton");

    await user.type(titleInput, "Test Title");
    await user.type(authorInput, "Test Author");
    await user.type(urlInput, "https://hello.fr");
    await user.click(submitButton);

    expect(handleAddNewBlog.mock.calls).toHaveLength(1);
    expect(handleAddNewBlog.mock.calls[0][0]).toStrictEqual({
      title: "Test Title",
      author: "Test Author",
      url: "https://hello.fr",
    });
  });
});
