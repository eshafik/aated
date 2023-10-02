import { LockFilled, UserOutlined } from "@ant-design/icons";
import { App, Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { LoginPayload } from "../../libs/api/@types/auth";
import { authAPI } from "../../libs/api/authAPI";
import { authService } from "../../libs/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const { isLoading, mutate } = useMutation(
    (payload: LoginPayload) => authAPI.loginUser(payload),
    {
      onSuccess: ({ data: { refresh, access } }) => {
        authService.setToken(access);
        authService.setRefreshToken(refresh);
        navigate("/members");
      },
      onError: () => {
        notification.error({ message: "Invalid username/password " });
      },
    }
  );
  return (
    <Row className="h-full" align="middle" justify="center">
      <Col xs={15} sm={12} md={10} lg={8} xl={6}>
        <Card
          className="bg-white shadow-2xl"
          title={
            <div className="bg-transparent shadow-2xl text-center text-xl">
              Sign In
            </div>
          }
        >
          <Form
            onFinish={(values) =>
              mutate({
                username: values.username,
                password: values.password,
              })
            }
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                className="h-11"
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                className="h-11"
                prefix={<LockFilled />}
                placeholder="Password"
              />
            </Form.Item>
            <Row justify={"space-between"}>
              <Col>
                <Form.Item name="remember" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
              <Col>
                <a onClick={() => navigate("/forgot-password")}>
                  Forgot password
                </a>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                className="w-full h-11"
                loading={isLoading}
                htmlType="submit"
              >
                Sign in
              </Button>
            </Form.Item>
            Or <a href="/signup">register now!</a>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
