/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  App,
  Avatar,
  Button,
  Card,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Row,
  Space,
  Spin,
  Typography,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useMatchMedia } from "../../components/useMatchMedia";
import { usePostList } from "../../config/hook/useSearch";
import { useComment } from "../../config/hook/usecomment";
import { PostPayload } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";
import { profileAPI } from "../../libs/api/profileAPI";
import { formatDate } from "../../utils/date.helpers";
import EditPost from "../post/EditPost";
import CreatePostModal from "./component/CreatePostModal";

type PostProps = {
  categoryId?: string;
};
const Posts: FC<PostProps> = ({ categoryId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const { notification } = App.useApp();

  const { mutate: createPostMutate, isLoading } = useMutation(
    (payload: PostPayload) => postAPI.createPost(payload),
    {
      onSuccess: () => {
        setIsModalOpen(false);
        queryClient.invalidateQueries(["post-list"]);
        message.success("Post successful created");
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  const {
    filter,
    posts: postsData,
    isLoading: loadingPostList,
  } = usePostList();

  useEffect(() => {
    filter.handleChangeCategory(categoryId);
  }, [categoryId]);

  const { data: profileData } = useQuery(["user-profile"], () =>
    profileAPI.getProfileDetails()
  );

  const { mutate: mutateComment } = useComment();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const isDesktopResolution = useMatchMedia("(min-width:600px)", true);

  return (
    <>
      <div className="max-w-3xl grid grid-cols-1 gap-4">
        <Card
          size="small"
          className="sticky top-11 z-10 drop-shadow"
          style={{ width: isDesktopResolution ? 770 : 490 }}
        >
          <Form form={searchForm}>
            <div className="flex gap-2">
              <Input.Search
                size="large"
                placeholder="Search Post"
                allowClear
                onSearch={filter.handleChangePosts}
              />
              <Button size="large" type="primary" onClick={() => showModal()}>
                Create Post
              </Button>
            </div>
          </Form>
        </Card>

        <Modal
          title="Create post"
          open={isModalOpen}
          onOk={form.submit}
          onCancel={handleOk}
          okText="Submit"
          okType="primary"
          confirmLoading={isLoading}
          centered
        >
          <Form
            layout="vertical"
            requiredMark={"optional"}
            form={form}
            onFinish={(values) =>
              createPostMutate({
                attachments:
                  values.attachments[0] == null ? null : values.attachments,
                body: values.body,
                category: values.category,
                title: values.title,
              })
            }
          >
            <CreatePostModal />
          </Form>
        </Modal>

        <Spin spinning={loadingPostList}>
          {postsData?.data?.map((items, i) => (
            <Card
              key={i}
              title={
                <Space>
                  <Avatar src={items?.user?.profile_pic} />
                  {items.user?.name}
                </Space>
              }
              extra={
                items?.user?.id == profileData?.data?.id ? (
                  <EditPost postsDetails={items} />
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
                  {formatDate(items?.created_at)}
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
        </Spin>
        <Pagination
          defaultCurrent={1}
          current={postsData?.meta_data?.page}
          total={postsData?.meta_data?.count}
          onChange={filter.handleChangePage}
          // showSizeChanger
          showTitle={true}
          showTotal={(total) => `Total ${total} Post`}
        />
      </div>
    </>
  );
};

export default Posts;
