import { App, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { authAPI } from "../../libs/api/authAPI";
import { useNavigate } from "react-router-dom";
import { CreateUserPayload } from "../../libs/api/@types/auth";

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
                email: values.email,
                otp: values.otp,
              })
            }
          >
            <Typography.Title level={4} className="text-center">
              Enter The OTP and The Email You Entered <br />
              Before To Verify Your Account
            </Typography.Title>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "You have to enter",
                },
              ]}
            >
              <Input placeholder="someone@domail.com" className="text-center" />
            </Form.Item>

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
              <Button loading={isLoading} className="w-full" htmlType="submit">
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
