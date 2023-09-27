import { App, Button, Card, Col, Form, Input, Row, Select } from "antd";
import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { CreateUserPayload } from "../../libs/api/@types/auth";
import { authAPI } from "../../libs/api/authAPI";
import { searchAPI } from "../../libs/api/searchAPI";

type SignUPForm = {
  name?: string;
  student_id?: string;
  phone?: string;
  email: string;
  passing_year?: string;
  password?: string;
  batch?: string;
};

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [emailStore, setEmailStore] = useState("");
  localStorage.setItem("user-email", emailStore);

  const { mutate, isLoading } = useMutation(
    (payload: CreateUserPayload) => authAPI.createUser(payload),
    {
      onSuccess: () => {
        notification.success({
          message: "A Verification Code has been sent to you email",
        });
        queryClient.invalidateQueries(["sign-up"]);
        navigate("/verify", { state: { emailStore } });
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  const { data } = useQuery(["batch-list"], () => searchAPI.getBatchList());

  const serialize = useCallback((values: SignUPForm) => {
    const payload = {
      name: values.name,
      student_id: values.student_id,
      phone: values.phone,
      email: values.email,
      passing_year: values.passing_year,
      password: values.password,
      batch: values.batch,
    };
    return payload;
  }, []);

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
            onFinish={(values) => {
              const payload = serialize(values);
              mutate(payload);
              setEmailStore(values.email);
            }}
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
              label="Batch"
              rules={[
                { required: true, message: "Please enter your Batch Number" },
              ]}
            >
              <Select
                size="large"
                options={data?.data?.map(({ id, name }) => ({
                  value: id?.toString(),
                  label: name,
                }))}
                placeholder="Batch"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              hasFeedback
              rules={[
                { required: true, message: "Please enter your Password" },
              ]}
            >
              <Input.Password className="h-11" placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password className="h-11" placeholder="Confirm Password" />
            </Form.Item>

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
