import { useToast } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import Post from "../../components/Post";
import { deletePostById, getPostById, getPosts } from "../../service/post";
import { Post as PostType } from "../../types";

interface PostDetailProps {
  post: PostType;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;

  let post: PostType | null = null;

  if (id) {
    post = await getPostById(+id);

    if (post) {
      post = {
        ...post,
        picture: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${post.picture}`,
      };
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const posts: PostType[] = await getPosts();

  return {
    paths: posts.map((post) => ({ params: { id: post.id.toString() } })),
    fallback: "blocking",
  };
};

const PostDetail: NextPage<PostDetailProps> = ({ post }) => {
  const router = useRouter();
  const toast = useToast();
  const updatePostHandler = (id: number) => {
    console.log("edit", id);
    router.push(`/edit-post/${id}`);
  };

  const deletePostHandler = async (id: number) => {
    console.log("delete", id);
    const result = await deletePostById(id);

    if (!result) {
      toast({
        title: "Could not delete the post",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
      return;
    }

    router.push("/");
  };

  if (!post) {
    return <DefaultErrorPage statusCode={404} />;
  }
  return (
    <Post
      post={post}
      updatePostHandler={updatePostHandler}
      deletePostHanlder={deletePostHandler}
    />
  );
};

export default PostDetail;
