import { Form, Card, Avatar, Typography, Button, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";

type PostType = {
  name?: string;
  src?: string;
  post?: string;
  post_title?: string;
};
const Post: FC<PostType> = ({ name, src, post_title }) => {
  return (
    <Row gutter={[24, 24]} align={"middle"} justify={"center"}>
      <Col>
        <Card
          className="max-w-2xl"
          title={
            <>
              <Avatar className="mr-2" />
              {name}
            </>
          }
          cover={<img alt="example" src={src} />}
        >
          <div className="text-black font-bold text-xl">{post_title}</div>
          <div className="mt-4 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </div>
          <Typography.Title level={5}> Comment (20)</Typography.Title>
          <Row>
            <Col>
              <Avatar />
            </Col>
            <Col>
              <Card
                className="bg-slate-100 ml-2"
                size="small"
                title="John Snow"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </Card>
            </Col>
          </Row>
          <Form className="mt-5">
            <Form.Item name="comment">
              <TextArea rows={5} />
            </Form.Item>
            <Form.Item>
              <Button className="bg-yellow-300" htmlType="submit">
                Comment
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Post;
