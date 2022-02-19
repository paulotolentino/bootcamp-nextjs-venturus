import { useToast } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import PostForm from "../../components/PostForm";
import { editPost, getPostById } from "../../service/post";
import { Post } from "../../types";

interface EditPostProps {
  post: Post | null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  let post: Post | null = null;

  if (id) {
    post = await getPostById(+id);
  }

  return {
    props: {
      post,
    },
  };
};

const EditPost: NextPage<EditPostProps> = ({ post }) => {
  const toast = useToast();
  const router = useRouter();
  const editPostHandler = async (postDate: FormData) => {
    if (!post) {
      return;
    }

    const result = await editPost(post.id, postDate);

    if (!result) {
      toast({
        title: "Could not edit the post",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
      return;
    }

    router.push(`/post/${post.id}`);
  };

  if (!post) {
    return <DefaultErrorPage statusCode={404} />;
  }
  return <PostForm postHandler={editPostHandler} post={post} />;
};

export default EditPost;
