import { Form, Card, Avatar, Typography, Button, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";

type PostType = {
  name?: string;
  src?: string;
  post?: string;
  post_title?: string;
};
const Post: FC<PostType> = ({ name, src, post, post_title }) => {
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
          <div className="mt-4 mb-4">{post}</div>
          <Typography.Title level={5}> Comment (20)</Typography.Title>
          <Form>
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
