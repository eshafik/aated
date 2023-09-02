import { Button, Card, Form, Input, Typography, Upload } from "antd";

const ProfileSetting = () => {
  return (
    <Card className="max-w-xl">
      <Form.Item>
        <Upload listType="picture-circle">Upload here</Upload>
      </Form.Item>
      <Form requiredMark="optional" layout="vertical">
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: "Please enter your First Name" }]}
        >
          <Input placeholder="John" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: "Please enter your Last Name" }]}
        >
          <Input placeholder="Snow" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your Email" }]}
        >
          <Input placeholder="someone@gmail.com" />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="number"
          rules={[
            { required: true, message: "Please enter your Phone Number" },
          ]}
        >
          <Input placeholder="01XXXXXXXX" />
        </Form.Item>

        <Typography.Title level={5}>Job Experience</Typography.Title>
        <Form.Item
          label="Role Name"
          name="role"
          rules={[{ required: true, message: "Please select role" }]}
        >
          <Input placeholder="5 Years" />
        </Form.Item>

        <Form.Item
          label="Company"
          name="company"
          rules={[
            { required: true, message: "Please enter your Company Name" },
          ]}
        >
          <Input placeholder="Microsoft" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please write some description" }]}
        >
          <Input.TextArea placeholder="Write something" />
        </Form.Item>

        <Form.Item>
          <Button className="bg-blue-500 flex justify-end" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfileSetting;
