import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import { useMutation } from "react-query";
import { LoginPayload } from "../../libs/api/@types/auth";
import { authAPI } from "../../libs/api/authAPI";
import { useNavigate } from "react-router-dom";
import { authService } from "../../libs/auth";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

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
      <Col sm={10} md={10} lg={7}>
        <Card
          size="small"
          title={<div className="text-center text-xl">Sign In</div>}
        >
          <Form
            requiredMark={"optional"}
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
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
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
              <Button className="w-full" loading={isLoading} htmlType="submit">
                Sign in
              </Button>
            </Form.Item>
            Or <a href="">register now!</a>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
