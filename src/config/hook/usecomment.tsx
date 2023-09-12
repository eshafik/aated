import { useMutation } from "react-query";
import { CommentPayload } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";
export const useComment = () => {
  const { mutate, isLoading } = useMutation(
    (payload: CommentPayload) => postAPI.createComment(payload),
    {
      onSuccess: (data) => {
        console.log(data?.data?.comment);
      },
    }
  );

  return { mutate, isLoading };
};
