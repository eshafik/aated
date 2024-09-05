import { App, Button, Card, Form, Input, Typography } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { CreateUserPayload } from "../../libs/api/@types/auth";
import { authAPI } from "../../libs/api/authAPI";

const EmailVerify = () => {
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    (payload: CreateUserPayload) => authAPI.createUser(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Successfully" });
        queryClient.invalidateQueries(["sign-up"]);
        navigate("/signin");
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );
  return (
    <div className="h-[calc(100vh-200px)] flex justify-center items-center">
      <Card className="flex justify-center items-center w-96">
        <Form
          form={form}
          onFinish={(values) =>
            mutate({
              email: localStorage.getItem("user-email"),
              otp: values.otp,
            })
          }
          className="flex items-center justify-center flex-col"
        >
          <Typography.Title level={4} className="text-center">
            Enter otp that sent to your email
          </Typography.Title>

          <Form.Item
            name="otp"
            rules={[{ required: true, message: "You have to enter" }]}
          >
            <Input.OTP
              length={6}
              placeholder="Please enter the otp"
              className="text-center"
            />
          </Form.Item>

          <Button
            type="primary"
            loading={isLoading}
            className="w-full"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default EmailVerify;
