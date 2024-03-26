import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Popconfirm,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import AvatarUploader from "../../container/AvaterUploader";
import { PostPayload, PostsDetails } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";

type EditPostProps = {
  postsDetails?: PostsDetails;
};
const EditPost: FC<EditPostProps> = ({ postsDetails }) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);

  const id = postsDetails?.id;

  const { mutate, isLoading: loadingUpdatePost } = useMutation(
    (payload: PostPayload) => postAPI.postUpdate(id, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("post-list");
        message.success("Post Updated");
        setIsEditPostOpen(false);
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  const { mutate: mutateDeletePost } = useMutation(
    (id?: string | number) => postAPI.deletePost(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post-list"]);
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  return (
    <>
      <Modal
        title="Edit Post"
        open={isEditPostOpen}
        onCancel={() => setIsEditPostOpen(false)}
        onOk={form.submit}
        okText="Update"
        confirmLoading={loadingUpdatePost}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            title: postsDetails?.title,
            description: postsDetails?.body,
            attachment: postsDetails?.attachments?.[0],
          }}
          onFinish={(values) => {
            mutate({
              title: values.title,
              body: values.description,
              attachments: values.attachment ? values.attachment : null,
            });
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
      <Dropdown
        menu={{
          items: [
            {
              key: "edit",
              label: (
                <div onClick={() => setIsEditPostOpen(true)}>
                  <EditOutlined /> Edit
                </div>
              ),
            },
            {
              key: "member",
              label: (
                <Popconfirm
                  title="Delete Post"
                  description="Are you sure want o delete this Post?"
                  onConfirm={() => mutateDeletePost(id)}
                  okText="Yes"
                  cancelText="No"
                  okType="danger"
                >
                  <DeleteOutlined /> Delete
                </Popconfirm>
              ),
            },
          ],
        }}
      >
        <Button type="text" icon={<MoreOutlined />} />
      </Dropdown>
    </>
  );
};

export default EditPost;
