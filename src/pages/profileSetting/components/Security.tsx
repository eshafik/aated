import { SecurityScanTwoTone } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";

const Security = () => {
  return (
    <Card className="shadow-2xl bg-transparent max-w-xl">
      <Form size="large" layout="vertical">
        <Form.Item label="Old Password" name="old_password">
          <Input.Password
            placeholder="old password"
            suffix={<SecurityScanTwoTone />}
          />
        </Form.Item>

        <Form.Item label="New Password" name="new_password">
          <Input.Password
            placeholder="old password"
            suffix={<SecurityScanTwoTone />}
          />
        </Form.Item>

        <Form.Item label="Confirm Password" name="confirm_password">
          <Input.Password
            placeholder="confirm password"
            suffix={<SecurityScanTwoTone />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Security;
