import { Button, Card, Col, Form, Input, Row } from "antd";
import { useMutation } from "react-query";
import { LoginPayload } from "../../libs/api/@types/auth";
import { authAPI } from "../../libs/api/authAPI";
import { useNavigate } from "react-router-dom";
import { authService } from "../../libs/auth";

const SignIn = () => {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation(
    (payload: LoginPayload) => authAPI.loginUser(payload),
    {
      onSuccess: ({ data: { refresh, access } }) => {
        authService.setToken(access);
        authService.setRefreshToken(refresh);
        navigate("/members");
      },
    }
  );
  return (
    <Row gutter={24} className="h-full" align="middle" justify="center">
      <Col span={5}>
        <Card
          size="small"
          title={<div className="text-center text-xl">Sign In</div>}
        >
          <Form
            onFinish={(values) =>
              mutate({
                username: values.username,
                password: values.password,
              })
            }
            size="middle"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="username"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your Password" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                loading={isLoading}
                htmlType="submit"
                className="bg-orange-500 w-full"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
