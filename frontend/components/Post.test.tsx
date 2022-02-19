import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Post from "./Post";

describe("Post.tsx", () => {
  it("Should render Post", () => {
    const updatePostHandler = jest.fn();
    const deletePostHandler = jest.fn();

    const post = {
      title: "My post",
      picture: "my-post.png",
      content: "My post content",
      id: 1,
    };
    render(
      <Post
        post={post}
        updatePostHandler={updatePostHandler}
        deletePostHanlder={deletePostHandler}
      />
    );

    expect(screen.getByText(post.title)).toBeTruthy();
    expect(screen.getByText(post.content)).toBeTruthy();
  });

  it("Should delete a Post", () => {
    const updatePostHandler = jest.fn();
    const deletePostHandler = jest.fn();

    const post = {
      title: "My post",
      picture: "my-post.png",
      content: "My post content",
      id: 1,
    };
    render(
      <Post
        post={post}
        updatePostHandler={updatePostHandler}
        deletePostHanlder={deletePostHandler}
      />
    );

    const deleteButton = screen.getByText("Delete");

    userEvent.click(deleteButton);

    expect(deletePostHandler).toHaveBeenCalled();
    expect(updatePostHandler).not.toHaveBeenCalled();
  });

  it("Should delete a Post", () => {
    const updatePostHandler = jest.fn();
    const deletePostHandler = jest.fn();

    const post = {
      title: "My post",
      picture: "my-post.png",
      content: "My post content",
      id: 1,
    };
    render(
      <Post
        post={post}
        updatePostHandler={updatePostHandler}
        deletePostHanlder={deletePostHandler}
      />
    );

    const updateButton = screen.getByText("Update");

    userEvent.click(updateButton);

    expect(deletePostHandler).not.toHaveBeenCalled();
    expect(updatePostHandler).toHaveBeenCalled();
  });
});
