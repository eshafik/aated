import { Avatar, Button, Card, Col, Form, Row, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
// type PostType = {
//   name?: string;
//   src?: string;
//   post_title?: string;
//   post?: string;
// };
const Posts = () => {
  const navigate = useNavigate();
  const POST_DATA = [
    {
      name: "John Snow",
      src: "https://i.ytimg.com/vi/-ZWD3NMzRjY/maxresdefault.jpg",
      post_title: "Post Title",
      post: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore See more{" "}`,
    },
    {
      name: "John Snow",
      src: "https://cdn.vox-cdn.com/thumbor/rQmuftF59d2AtZ454JC7Teh4IaY=/0x0:1200x800/1200x800/filters:focal(478x55:670x247)/cdn.vox-cdn.com/uploads/chorus_image/image/71269489/MattSmithDaemonTargaryen_HBO_Getty_Ringer.0.jpg",
      post_title: "Post Title",
      post: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore See more{" "}`,
    },
  ];
  return (
    <Row gutter={24} align="middle" justify="center">
      <Col>
        <Card
          className="bg-transparent"
          tabList={[
            { key: "allpost", label: "All Post" },
            { key: "jobpost", label: "Job Post" },
            { key: "generalpost", label: "General Post" },
            { key: "helppost", label: "Help Post" },
            { key: "notice", label: "Notie" },
          ]}
        >
          {POST_DATA.map((items, i) => (
            <Card
              key={i}
              className="max-w-2xl"
              title={
                <>
                  <Avatar className="mr-2" />
                  {items.name}
                </>
              }
              cover={<img alt="example" src={items.src} />}
            >
              <div className="text-black font-bold text-xl">
                {items.post_title}
              </div>
              <div className="mt-4 mb-4">{items.post}</div>
              <Typography.Title level={5}> Comment (20)</Typography.Title>
              <Form>
                <Form.Item name="comment">
                  <TextArea rows={5} />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="bg-yellow-300"
                    htmlType="submit"
                    onClick={() => navigate(`/${i}`)}
                  >
                    Comment
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          ))}
        </Card>
      </Col>
    </Row>
  );
};

export default Posts;
