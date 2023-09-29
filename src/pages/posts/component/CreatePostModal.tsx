import { Form, Input, Select } from "antd";
import AvatarUploader from "../../../container/AvaterUploader";

const CreatePostModal = () => {
  return (
    <>
      <Form.Item
        label="Post Title"
        name="title"
        rules={[{ required: true, message: "Please Write title of your post" }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        label="Post Category"
        name="category"
        rules={[{ required: true, message: "Please Select Category" }]}
      >
        <Select
          placeholder="Post category"
          options={[
            { label: "Job", value: "1" },
            { label: "Notice", value: "2" },
            { label: "General", value: "3" },
            { label: "Help", value: "4" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Post Description"
        name="body"
        rules={[{ required: true, message: "Please write some description" }]}
      >
        <Input.TextArea rows={5} placeholder="Description" />
      </Form.Item>
      <Form.Item label="Attachments" name={["attachments", 0]}>
        <AvatarUploader />
      </Form.Item>
    </>
  );
};

export default CreatePostModal;
