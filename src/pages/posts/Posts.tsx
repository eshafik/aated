import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMutation } from "react-query";
import { PostPayload } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";

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
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate, isLoading } = useMutation(
    (payload: PostPayload) => postAPI.createPost(payload),
    {
      onSuccess: () => {
        console.log("Success");
      },
    }
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
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
          <Form
            form={form}
            onFinish={(values) => {
              mutate({
                title: values.title,
                body: values.body,
                attachments: values.attachments,
              });
            }}
          >
            <Row gutter={[12, 12]}>
              <Col span={19}>
                <Form.Item>
                  <Input
                    suffix={
                      <SearchOutlined onClick={() => console.log("HI There")} />
                    }
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button onClick={showModal}>create Post</Button>
                </Form.Item>
              </Col>
            </Row>
            <Modal
              title="create post"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleOk}
              okText="Submit"
              okType="default"
              centered
            >
              <Form.Item name="title">
                <Input placeholder="Title" />
              </Form.Item>

              <Form.Item name="category">
                <Select placeholder="Post category" />
              </Form.Item>

              <Form.Item name="body">
                <Input.TextArea rows={5} placeholder="Description" />
              </Form.Item>

              <Form.Item name="attachments">
                <Upload>
                  <Button loading={isLoading} icon={<UploadOutlined />}>
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Modal>
          </Form>
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
              <Link to={"post"}>
                <Typography.Title level={5}> Comment (20)</Typography.Title>
              </Link>
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
