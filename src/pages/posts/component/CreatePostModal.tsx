import { App, Avatar, Button, Card, Form, Input, Select } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { ImagePlus } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { twMerge } from "tailwind-merge";
import CardMeta from "../../../components/CardMeta";
import FileUpload from "../../../container/FileUpload";
import { PostPayload } from "../../../libs/api/@types/post";
import { postAPI } from "../../../libs/api/postAPI";

const CreatePostModal = () => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [form] = useForm();
  const watchAttachment = useWatch(["attachments", 0], form);

  const { mutate: createPostMutate, isLoading } = useMutation(
    (payload: PostPayload) => postAPI.createPost(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Post successful created" });
        queryClient.invalidateQueries(["post-list"]);
        queryClient.invalidateQueries(["job-post-list"]);
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );
  const userProfile = JSON.parse(localStorage.getItem("user-profile") || "[]");

  return (
    <Card className="shadow border rounded-lg mt-3" title="Create Post">
      <Form
        form={form}
        layout="vertical"
        requiredMark={"optional"}
        onFinish={(values) =>
          createPostMutate({
            attachments:
              values.attachments[0] == null ? null : values.attachments,
            body: values.body,
            category: values.category,
            title: values.title,
          })
        }
      >
        <CardMeta
          icon={<Avatar src={userProfile?.profile_pic} size="large" />}
          title={userProfile?.name}
        />
        <div className="flex w-full gap-2 mt-4">
          <Form.Item
            // label="Post Title"
            name="title"
            className="w-full"
            rules={[
              { required: true, message: "Please Write title of your post" },
            ]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            // label="Post Category"
            name="category"
            rules={[{ required: true, message: "Please Select Category" }]}
            className="w-full"
          >
            <Select
              placeholder="Select Post category"
              options={[
                { label: "Job", value: "1" },
                { label: "Notice", value: "2" },
                { label: "General", value: "3" },
                { label: "Help", value: "4" },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="body"
          rules={[{ required: true, message: "Please write some description" }]}
        >
          <Input.TextArea rows={5} placeholder="Description" />
        </Form.Item>
        <div
          className={twMerge(
            "flex justify-between",
            watchAttachment && "flex-col"
          )}
        >
          <Form.Item name={["attachments", 0]}>
            <FileUpload
              uploadIcon={<ImagePlus size={16} />}
              UploadListType="picture"
              onChange={(val) => console.log(val)}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Post
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default CreatePostModal;
