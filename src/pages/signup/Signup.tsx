import { App, Button, Card, Col, Form, Input, InputNumber, Row } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { CreateUserPayload } from "../../libs/api/@types/auth";
import { authAPI } from "../../libs/api/authAPI";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (payload: CreateUserPayload) => authAPI.createUser(payload),
    {
      onSuccess: () => {
        notification.success({ message: "Sign-Up Successfully" });
        queryClient.invalidateQueries(["sign-up"]);
        navigate("/verify");
      },
    }
  );
  return (
    <Row gutter={24} className="h-full" align="middle" justify="center">
      <Col span={8}>
        <Card
          size="small"
          title={<div className="text-center text-xl">Sign UP</div>}
        >
          <Form
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
              <Input placeholder="name" />
            </Form.Item>

            <Form.Item
              label="Student ID"
              name="student_id"
              rules={[
                { required: true, message: "Please enter your StudentID" },
              ]}
            >
              <Input placeholder="Student ID" />
            </Form.Item>
            {/* 
            <Form.Item>
              <Select
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
            </Form.Item> */}

            {/* <Form.Item>
              <Select
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
            </Form.Item> */}

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please enter your phone" }]}
            >
              <Input placeholder="Phone" />
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

            <Form.Item
              name="passing_year"
              rules={[
                { required: true, message: "Please enter your Password" },
              ]}
            >
              <Input placeholder="Passing year" />
            </Form.Item>

            <Form.Item name="batch">
              <InputNumber placeholder="Batch" />
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
                loading={isLoading}
                htmlType="submit"
                className="bg-orange-500 w-full"
              >
                Sign UP
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Signup;
