import { useMutation } from "react-query";
import { CommentPayload } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
export const useComment = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    (payload: CommentPayload) => postAPI.createComment(payload),
    {
      onSuccess: (data) => {
        navigate(`${data?.data?.post}`);
        notification.success({ message: "Comment Successful" });
      },
    }
  );

  return { mutate, isLoading };
};
