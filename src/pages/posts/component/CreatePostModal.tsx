import { Form, Input, Select } from "antd";
import AvatarUploader from "../../../container/AvaterUploader";

const CreatePostModal = () => {
  return (
    <>
      <Form.Item name="title">
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="category">
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
      <Form.Item name="body">
        <Input.TextArea rows={5} placeholder="Description" />
      </Form.Item>
      <Form.Item name="attachments">
        <AvatarUploader />
      </Form.Item>
    </>
  );
};

export default CreatePostModal;
