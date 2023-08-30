import { Button, Card, Col, Form, Input, Row, Select } from "antd";

const Signup = () => {
  return (
   <Row gutter={24} className="h-full" align="middle" justify="center">
    <Col span={8}> 
     <Card
      size="small"
      title={<div className="text-center text-xl">
      Sign UP
      </div>}
    >
      <Form 
      size="middle" layout="vertical">
        <Form.Item
        name="name"
        label="Name"
        rules={[{required: true, message: "Please enter your name"}]}
        >
          <Input placeholder="name" />
        </Form.Item>

        <Form.Item
        label="Student ID"
        name="studentId"
        rules={[{required: true, message: "Please enter your StudentID"}]}
        >
          <Input placeholder="Student ID" />
        </Form.Item>

        <Form.Item>
          <Select
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Select
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Form.Item>

        <Form.Item
        label="Email"
        name="Email"
        rules={[{required: true, message: "Please enter your name"}]}

        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
                label="Phone"
                name="phone"
                rules={[{required: true, message: "Please enter your phone"}]}
        >
          <Input placeholder="Phone" />
        </Form.Item>

        <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: "Please enter your Password"}]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[{required: true, message: "Please enter Confirm Password"}]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" className="bg-orange-500 w-full">Sign UP</Button>
        </Form.Item>
      </Form>
    </Card>
    </Col>
   </Row>
  );
};

export default Signup;
