import { App, Button, Card, Col, Form, Input, Row, Typography } from "antd";
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
    <Row align={"middle"} className="h-full w-full" justify={"center"}>
      <Col>
        <Card hoverable>
          <Form
            form={form}
            onFinish={(values) =>
              mutate({
                email: localStorage.getItem("user-email"),
                otp: values.otp,
              })
            }
          >
            <Typography.Title level={4} className="text-center">
              Enter otp that sent to your email
            </Typography.Title>

            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: "You have to enter",
                },
              ]}
            >
              <Input
                placeholder="Please enter the otp"
                className="text-center"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                loading={isLoading}
                className="w-full"
                htmlType="submit"
              >
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
