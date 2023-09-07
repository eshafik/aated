/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { PostPayload } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";
import CreatePostModal from "./component/CreatePostModal";
import { useForm } from "../../config/hook/formHook";
import { CreatePostInputType } from "../../libs/api/@types/form";

const Posts = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate, isLoading } = useMutation(
    (payload: PostPayload) => postAPI.createPost(payload),
    {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    }
  );

  const { form, handleFinish } = useForm<CreatePostInputType>({
    onFinish: (values) => mutate(values),
  });

  const { data: postsData, isLoading: loadingPostList } = useQuery(
    ["post-list"],
    () => postAPI.getPostList()
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
        <Spin spinning={loadingPostList}>
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
            <Form form={form}>
              <Row gutter={[12, 12]}>
                <Col span={19}>
                  <Form.Item>
                    <Input
                      suffix={
                        <SearchOutlined
                          onClick={() => console.log("HI There")}
                        />
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
                onOk={form.submit}
                onCancel={handleOk}
                okText="Submit"
                okType="default"
                centered
              >
                <CreatePostModal
                  form={form}
                  isLoading={isLoading}
                  onfinish={handleFinish}
                />
              </Modal>
            </Form>
            {postsData?.data?.map((items, i) => (
              <Card
                key={i}
                className="max-w-2xl"
                title={
                  <>
                    <Avatar className="mr-2" src={items?.user?.profile_pic} />
                    {items.user?.name}
                  </>
                }
                cover={<img alt="example" src={items.attachments} />}
              >
                <div className="text-black font-bold text-xl">
                  {items.title}
                </div>
                <div className="mt-4 mb-4">{items.body}</div>
                <Link to={`${items?.id}`}>
                  <Typography.Link>
                    {" "}
                    Comment ({items?.total_comments})
                  </Typography.Link>
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
        </Spin>
      </Col>
    </Row>
  );
};

export default Posts;
