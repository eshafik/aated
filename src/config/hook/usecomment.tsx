import { notification } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { CommentPayload } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";
export const useComment = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    (payload: CommentPayload) => postAPI.createComment(payload),
    {
      onSuccess: (data) => {
        navigate(`${data?.data?.post}`);
        notification.success({ message: "Comment Successful" });
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  return { mutate, isLoading };
};
