import { FormEvent, useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Post } from "../types";

interface PostFormProps {
  postHandler: (formData: FormData) => void;
  post?: Post;
}

const PostForm = ({ postHandler, post }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState<File | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    if (picture) {
      formData.append("picture", picture);
    }
    formData.append("title", title);
    formData.append("content", content);
    postHandler(formData);
  };

  const resetHandler = () => {
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={submitHandler} encType="multipart/form-data">
      <Stack spacing={6}>
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            type="text"
            value={title}
            placeholder="Title"
            size="lg"
            isRequired
            data-testid="post-form-title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="picture">Picture</FormLabel>
          <Input
            id="picture"
            type="file"
            placeholder="Picture"
            size="lg"
            isRequired={!post}
            data-testid="post-form-picture"
            style={{ border: "none" }}
            onChange={(event) =>
              setPicture(event.target.files ? event.target.files[0] : null)
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="content">Content</FormLabel>
          <Textarea
            id="content"
            value={content}
            placeholder="Content"
            size="lg"
            isRequired
            data-testid="post-form-content"
            rows={15}
            onChange={(event) => setContent(event.target.value)}
          />
        </FormControl>
        <Box display="flex" justifyContent="space-between">
          <Button type="reset" onClick={resetHandler} colorScheme="gray">
            Reset
          </Button>
          <Button type="submit" colorScheme="purple">
            Submit
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default PostForm;
