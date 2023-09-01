import { Avatar, Button, Card, Form, Input, Typography, Upload } from "antd";

const ProfileSetting = () => {
  return (
    <Card>
      <Avatar />
      <Upload>Upload here</Upload>
      <Form layout="vertical">
        <Form.Item label="First Name">
          <Input />
        </Form.Item>

        <Form.Item label="Last Name">
          <Input />
        </Form.Item>

        <Form.Item label="Email">
          <Input />
        </Form.Item>

        <Form.Item label="Contact Number">
          <Input />
        </Form.Item>

        <Typography.Title level={5}>Job Experience</Typography.Title>
        <Form.Item label="Role Name">
          <Input />
        </Form.Item>

        <Form.Item label="Company">
          <Input />
        </Form.Item>

        <Form.Item label="Description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfileSetting;
