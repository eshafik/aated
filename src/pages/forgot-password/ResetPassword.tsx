import { App, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useMutation } from "react-query";
import { ResetPasswordPayload } from "../../libs/api/@types/auth";
import { authAPI } from "../../libs/api/authAPI";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const { isLoading, mutate } = useMutation(
    (payload: ResetPasswordPayload) => authAPI.resetPassword(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Your password has been changed" });
        navigate("/signin");
      },
      onError: () => {
        notification.error;
      },
    }
  );
  return (
    <Row gutter={24} className="h-full" align="middle" justify="center">
      <Col sm={10} md={10} lg={7}>
        <Card
          className="text-center"
          size="small"
          title={
            <>
              <Typography.Title className="mt-3" level={4}>
                Forgot Password
              </Typography.Title>
              <Typography.Paragraph type="secondary">
                Enter your email to send a verification code
              </Typography.Paragraph>
            </>
          }
        >
          <Form
            requiredMark={"optional"}
            onFinish={(values) =>
              mutate({
                email: values.email,
                otp: values.otp,
                password: values.password,
              })
            }
            size="middle"
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="otp"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="OTP" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button className="w-full" loading={isLoading} htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPassword;
