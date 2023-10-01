import { App, Form, Input, Modal, Skeleton, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AvatarUploader from "../../container/AvaterUploader";
import { PostPayload } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";

type EditPostProps = {
  postId?: string;
  isOpen?: boolean;
  onCancel: () => void;
};
const EditPost: FC<EditPostProps> = ({ postId, isOpen, onCancel }) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const [form] = Form.useForm();

  const { data: postData, isLoading } = useQuery(["post-data"], () =>
    postAPI.getPostDetails(postId as string)
  );

  const { mutate, isLoading: loadingUpdatePost } = useMutation(
    (payload: PostPayload) => postAPI.postUpdate(postId as string, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("post-list");
        message.success("Post Updated");
        onCancel();
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  return (
    <Skeleton loading={isLoading}>
      <Modal
        title="Edit Post"
        open={isOpen}
        onCancel={onCancel}
        onOk={form.submit}
        okText="Update"
        confirmLoading={loadingUpdatePost}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            mutate({
              title: values.title,
              body: values.description,
              attachments: values.attachment ? values.attachment : null,
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
        </Form>
      </Modal>
    </Skeleton>
  );
};

export default EditPost;
