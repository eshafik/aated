import { Button, Card, Col, Form, Input, Row } from "antd";

const SignIn = () => {
  return (
   <Row gutter={24} className="h-full" align="middle" justify="center">
    <Col span={5}> 
     <Card
      size="small"
      title={<div className="text-center text-xl">
      Sign In
      </div>}
    >
      <Form 
      size="middle" layout="vertical">
        <Form.Item
        label="Email"
        name="email"
        rules={[{required: true, message: "Please enter your email"}]}

        >
          <Input placeholder="Email" />
        </Form.Item>


        <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: "Please enter your Password"}]}
        >
          <Input.Password placeholder="Password" />
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

export default SignIn;
