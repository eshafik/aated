import { App, Button, Card, Col, Form, Input, Row } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { CreateUserPayload } from "../../libs/api/@types/auth";
import { authAPI } from "../../libs/api/authAPI";

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (payload: CreateUserPayload) => authAPI.createUser(payload),
    {
      onSuccess: () => {
        notification.success({
          message: "A Verification Code has been sent to you email",
        });
        queryClient.invalidateQueries(["sign-up"]);
        navigate("/verify");
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );
  return (
    <Row align="middle" justify="center">
      <Col xs={20} sm={15} md={15} lg={12} xl={12} xxl={10}>
        <Card
          // size="small"
          className="shadow-3xl"
          title={<div className="text-center text-xl">Sign UP</div>}
        >
          <Form
            // className="w-96"
            form={form}
            onFinish={(values) =>
              mutate({
                name: values.name,
                student_id: values.student_id,
                phone: values.phone,
                email: values.email,
                passing_year: values.passing_year,
                password: values.password,
                batch: values.batch,
              })
            }
            size="middle"
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input className="h-11" placeholder="name" />
            </Form.Item>

            <Form.Item
              label="Student ID"
              name="student_id"
              rules={[
                { required: true, message: "Please enter your StudentID" },
              ]}
            >
              <Input className="h-11" placeholder="Student ID" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input className="h-11" placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please enter your phone" }]}
            >
              <Input className="h-11" placeholder="Phone" />
            </Form.Item>

            <Form.Item
              name="passing_year"
              label="Passing Year"
              rules={[
                { required: true, message: "Please enter your Password" },
              ]}
            >
              <Input className="h-11" placeholder="Passing year" />
            </Form.Item>

            <Form.Item
              name="batch"
              label="Batch Number"
              rules={[
                { required: true, message: "Please enter your Batch Number" },
              ]}
            >
              <Input className="h-11" placeholder="Batch" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your Password" },
              ]}
            >
              <Input.Password className="h-11" placeholder="Password" />
            </Form.Item>

            {/* <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please enter Confirm Password" },
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                loading={isLoading}
                htmlType="submit"
                className="h-11 w-full"
              >
                Sign UP
              </Button>
            </Form.Item>
          </Form>
          <Link to={"/signin"}>Already have an account?</Link>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUp;
