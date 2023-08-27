import { Button, Card, Form, Input, Select } from "antd";

const Signup = () => {
  return (
    <Card
      title="Sign UP"
      className="max-w-lg text-center top-10 justify-c  mx-auto"
    >
      <Form size="middle" layout="vertical">
        <Form.Item>
          <Input placeholder="name" />
        </Form.Item>

        <Form.Item>
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

        <Form.Item>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <Input placeholder="Phone" />
        </Form.Item>

        <Form.Item>
          <Input placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Input placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button className="bg-orange-200 w-full">Sign UP</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Signup;
