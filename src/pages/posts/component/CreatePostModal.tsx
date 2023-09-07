import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, Select, Upload } from "antd";
import { FC } from "react";
import { CreatePostInputType } from "../../../libs/api/@types/form";
type CreatePostModalType = {
  onfinish?: (values: CreatePostInputType) => void;
  form?: FormInstance<CreatePostInputType>;
  isLoading?: boolean;
};
const CreatePostModal: FC<CreatePostModalType> = ({
  onfinish,
  form,
  isLoading,
}) => {
  return (
    <Form onFinish={onfinish} form={form}>
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
        <Upload>
          <Button loading={isLoading} icon={<UploadOutlined />}>
            Click to Upload
          </Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default CreatePostModal;
