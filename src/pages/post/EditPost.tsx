import { App, Button, Card, Form, Input, Skeleton, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import AvatarUploader from "../../container/AvaterUploader";
import { PostPayload } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";

const EditPost = () => {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const { data: postData, isLoading } = useQuery(["post-data"], () =>
    postAPI.getPostDetails(postId as string)
  );

  const { mutate, isLoading: loadingUpdatePost } = useMutation(
    ["post-data"],
    (payload: PostPayload) => postAPI.postUpdate(postId as string, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("post-data");
        message.success("Post Updated");
        navigate("/posts");
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  return (
    <Skeleton loading={isLoading}>
      <Card className="max-w-xl" title="Edit Post">
        <Form
          layout="vertical"
          onFinish={(values) => {
            mutate({
              title: values.title,
              body: values.description,
              attachments: values.attachment,
            });
          }}
          initialValues={{
            title: postData?.data?.title,
            description: postData?.data?.body,
            attachment: postData?.data?.attachments?.[0],
          }}
        >
          <Form.Item name="title" label="Post Title">
            <Input placeholder="Post Title" />
          </Form.Item>

          <Form.Item name="description" label="Post Description">
            <TextArea rows={5} placeholder="Write some post Description" />
          </Form.Item>

          <Form.Item label="Attachment" name="attachment">
            <AvatarUploader />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loadingUpdatePost}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Skeleton>
  );
};

export default EditPost;
