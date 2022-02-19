import { Post } from '../types/index';

interface getPostsProps {
  (): Promise<Post[]>;
}

interface getPostByIdProps {
  (id: number): Promise<Post | null>;
}

interface addPostProps {
  (post: FormData): Promise<Post | null>;
}

interface editPostProps {
  (id: number, post: FormData): Promise<boolean>;
}

interface deletePostByIdProps {
  (id: number): Promise<boolean>;
}

export const getPosts: getPostsProps = async () => {
  let posts: Post[] = [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`);

    if (response.ok && response.status === 200) {
      const data = await response.json();
      posts = [...data];
    }
  } catch (e) {
    console.error(e);
  }

  return posts;
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
  } catch (e) {
    console.error(e);
  }

  return post;
};

export const addPost: addPostProps = async (postData) => {
  let post = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post`,
      {
        method: 'POST',
        body: postData,
      }
    );

    if (response.ok && response.status === 201) {
      const data = await response.json();
      post = { ...data };
    }
  } catch (e) {
    console.error(e);
  }

  return post;
};

export const editPost: editPostProps = async (id, postData) => {
  let result = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${id}`,
      {
        method: 'PUT',
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

export const deletePostById: deletePostByIdProps = async (id) => {
  let result = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${id}`,
      {
        method: 'DELETE',
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
