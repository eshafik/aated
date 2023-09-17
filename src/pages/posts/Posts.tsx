/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  App,
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Row,
  Spin,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PostPayload } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";
import CreatePostModal from "./component/CreatePostModal";
import { profileAPI } from "../../libs/api/profileAPI";
import { useComment } from "../../config/hook/usecomment";
import { usePostList } from "../../config/hook/useSearch";
import moment from "moment";

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [showMore, setShowMore] = useState(false);
  const { notification } = App.useApp();

  const { mutate: createPostMutate, isLoading } = useMutation(
    (payload: PostPayload) => postAPI.createPost(payload),
    {
      onSuccess: () => {
        setIsModalOpen(false);
        queryClient.invalidateQueries(["post-list"]);
        notification.success({ message: "Post successful created" });
      },
    }
  );

  const {
    filter,
    posts: postsData,
    isLoading: loadingPostList,
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

  // const { data: postDetailsData, handlePostId } = useGetPostDetails();

  const showModal = () => {
    setIsModalOpen(true);
    // if (id) {
    //   handlePostId(id);
    // }
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
            extra={
              <Button type="primary" onClick={showModal}>
                Create Post
              </Button>
            }
          >
            <Form form={searchForm}>
              <Row gutter={[5, 5]}>
                <Col span={24}>
                  <Input.Search
                    size="large"
                    className="mb-3"
                    placeholder="Search Post"
                    allowClear
                    onSearch={filter.handleChangePosts}
                  />
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
                okType="primary"
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
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "edit",
                            label: (
                              <Link to={`${items?.id}`}>
                                <EditOutlined /> Edit
                              </Link>
                            ),
                          },
                          {
                            key: "member",
                            label: (
                              <Popconfirm
                                title="Delete Post"
                                description="Are you sure want o delete this Post?"
                                onConfirm={() => mutateDeletePost(items?.id)}
                                okText="Yes"
                                cancelText="No"
                                okType="danger"
                              >
                                <DeleteOutlined /> Delete
                              </Popconfirm>
                            ),
                          },
                        ],
                      }}
                    >
                      <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                  ) : (
                    ""
                  )
                }
              >
                <Row justify={"space-between"}>
                  <Typography.Title className="mt-0" level={5}>
                    {items.title}
                  </Typography.Title>
                  <Typography.Paragraph>
                    {moment(
                      `${items?.created_at?.slice(0, 10)}`,
                      "YYYY-MM-DD"
                    ).fromNow()}
                  </Typography.Paragraph>
                </Row>
                {items.attachments?.[0] ? (
                  <Image
                    className="max-h-80"
                    alt="example"
                    src={items.attachments?.[0]}
                  />
                ) : (
                  ""
                )}

                <div className="mb-4">
                  {showMore ? items?.body : `${items?.body?.substring(0, 250)}`}
                  {items?.body?.length > 250 ? (
                    <Link
                      onClick={() => setShowMore(!showMore)}
                      to={`${items?.id}`}
                    >
                      ...See more
                    </Link>
                  ) : (
                    ""
                  )}
                </div>

                <Link to={`${items?.id}`}>
                  <Typography.Link>
                    Comment ({items?.total_comments})
                  </Typography.Link>
                </Link>
                <Form
                  onFinish={(values) =>
                    mutateComment({
                      comment: values?.comment?.[i],
                      post: items?.id,
                    })
                  }
                >
                  <Form.Item name={["comment", i]}>
                    <TextArea rows={2} />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
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
