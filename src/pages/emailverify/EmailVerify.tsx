import { Button, Card, Col, Form, Input, Row, Typography } from "antd";

const EmailVerify = () => {
  const [form] = Form.useForm();
  return (
    <Row align={"middle"} className="h-full w-full" justify={"center"}>
      <Col>
        <Card hoverable>
          <Form form={form}>
            <Typography.Title level={4}>
              Enter The OTP To Verify Your Account
            </Typography.Title>

            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: "You have to enter the otp to verify account",
                },
              ]}
            >
              <Input
                placeholder="Please enter the otp"
                className="text-center"
              />
            </Form.Item>

            <Form.Item>
              <Button className="w-full" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default EmailVerify;
