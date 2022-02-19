import { Post } from "../types";

interface AddPostProps {
  (post: FormData): Promise<Post | null>;
}

interface getPostByIdProps {
  (id: number): Promise<Post | null>;
}

interface getPostProps {
  (): Promise<Post[]>;
}

interface deletePostByIdProps {
  (id: number): Promise<boolean>;
}

interface editPostProps {
  (id: number, post: FormData): Promise<boolean>;
}

export const addPost: AddPostProps = async (postData) => {
  let post = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post`,
      {
        method: "POST",
        body: postData,
      }
    );

    if (response && response.status === 201) {
      const data = await response.json();
      post = {
        ...data,
      };
    }
  } catch (error) {
    console.error(error);
  }
  return post;
};

export const getPostById: getPostByIdProps = async (id) => {
  let post: Post | null = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${id}`
    );
    if (response.ok && response.status === 200) {
      const data = await response.json();
      post = { ...data };
    }
  } catch (error) {
    console.log(error);
  }
  return post;
};

export const getPosts: getPostProps = async () => {
  let posts: Post[] = [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`);
    if (response.ok && response.status === 200) {
      const data = await response.json();
      posts = [...data];
    }
  } catch (error) {
    console.error(error);
  }

  return posts;
};

export const deletePostById: deletePostByIdProps = async (id) => {
  let result = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok && response.status === 200) {
      result = true;
    }
  } catch (error) {
    console.error(error);
  }

  return result;
};

export const editPost: editPostProps = async (id, postData) => {
  let result = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${id}`,
      {
        method: "PUT",
        body: postData,
      }
    );

    if (response.ok && response.status === 200) {
      result = true;
    }
  } catch (e) {
    console.error(e);
  }

  return result;
};
