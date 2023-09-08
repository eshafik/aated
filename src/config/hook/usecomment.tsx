import { useMutation } from "react-query";
import { CommentPayload } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";
import { Form } from "antd";
export const useComment = () => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useMutation(
    (payload: CommentPayload) => postAPI.createComment(payload),
    {
      onSuccess: () => {
        form.resetFields();
      },
    }
  );

  return { mutate, isLoading, form };
};
