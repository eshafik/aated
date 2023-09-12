/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Spin,
  Tabs,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PostPayload } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";
import CreatePostModal from "./component/CreatePostModal";
import { profileAPI } from "../../libs/api/profileAPI";
import { useComment } from "../../config/hook/usecomment";
import { usePostList } from "../../config/hook/useSearch";

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();

  const { mutate: createPostMutate, isLoading } = useMutation(
    (payload: PostPayload) => postAPI.createPost(payload),
    {
      onSuccess: () => {
        setIsModalOpen(false);
        refetch;
      },
    }
  );

  const {
    filter,
    posts: postsData,
    isLoading: loadingPostList,
    refetch,
  } = usePostList();

  const { data: profileData } = useQuery(["user-profile"], () =>
    profileAPI.getProfileDetails()
  );

  const { mutate: mutateDeletePost } = useMutation(
    (id: string | number) => postAPI.deletePost(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post-list"]);
      },
    }
  );

  const { mutate: mutateComment } = useComment();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  console.log("Filter", filter.filters);

  return (
    <Row gutter={24} align="middle" justify="center">
      <Col>
        <Spin spinning={loadingPostList}>
          <Card
            className="bg-transparent"
            tabList={[
              { key: "0", label: "All Post" },
              { key: "1", label: "Job Post" },
              { key: "2", label: "Notie" },
              { key: "3", label: "General Post" },
              { key: "4", label: "Help Post" },
            ]}
            onTabChange={(key) => {
              postsData?.data?.map((items) => {
                key == items?.category?.id
                  ? filter?.handleChangeTabs(items?.id)
                  : "";
              });
            }}
          >
            <Form form={searchForm}>
              <Row gutter={[5, 5]}>
                <Col span={18}>
                  <Input.Search
                    className="max-w-sm"
                    placeholder="Search Post"
                    allowClear
                    onSearch={filter.handleChangePosts}
                  />
                </Col>
                <Col>
                  <Form.Item>
                    <Button onClick={showModal}>create Post</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>

            <Form
              form={form}
              onFinish={(values) =>
                createPostMutate({
                  attachments: values.attachments,
                  body: values.body,
                  category: values.category,
                  title: values.title,
                })
              }
            >
              <Modal
                title="create post"
                open={isModalOpen}
                onOk={form.submit}
                onCancel={handleOk}
                okText="Submit"
                okType="default"
                confirmLoading={isLoading}
                centered
              >
                <CreatePostModal />
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
                extra={
                  items?.user?.id == profileData?.data?.id ? (
                    <Popconfirm
                      title="Delete the Post"
                      description="Are you sure to delete this post?"
                      onConfirm={() => mutateDeletePost(items?.id)}
                      okText="Yes"
                      cancelText="No"
                      okType="danger"
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  ) : (
                    ""
                  )
                }
              >
                <div className="text-black font-bold text-xl">
                  {items.title}
                </div>
                <img alt="example" src={items.attachments?.[0]} />
                <div className="mt-4 mb-4">{items.body}</div>
                <Link to={`${items?.id}`}>
                  <Typography.Link>
                    Comment ({items?.total_comments})
                  </Typography.Link>
                </Link>
                <Form
                  onFinish={(values) =>
                    mutateComment({
                      comment: values?.comment?.[0],
                      post: items?.id,
                    })
                  }
                >
                  <Form.Item name={["comment", i]}>
                    <TextArea rows={2} />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      // loading={loadingComment}
                      className="bg-yellow-300"
                      htmlType="submit"
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
