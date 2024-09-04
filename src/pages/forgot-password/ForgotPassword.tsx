import { UserOutlined } from "@ant-design/icons";
import { App, Button, Card, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordPayload } from "../../libs/api/@types/auth";
import { authAPI } from "../../libs/api/authAPI";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const [emailStore, setEmailStore] = useState("");
  localStorage.setItem("signup-email", emailStore);

  const { isLoading, mutate } = useMutation(
    (payload: ForgotPasswordPayload) => authAPI.forgotPassword(payload),
    {
      onSuccess: () => {
        notification.success;
        navigate("/reset-password", { state: { emailStore } });
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );
  return (
    <div className="h-[calc(100vh-175px)] flex justify-center items-center">
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
          onFinish={(values) => {
            mutate({
              email: values.email,
            });
            setEmailStore(values.email);
          }}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="w-full"
              loading={isLoading}
              htmlType="submit"
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
