import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import {
  App,
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Image,
  Popconfirm,
  Row,
  Skeleton,
  Typography,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import CardMeta from "../../components/CardMeta";
import { useUserDetails } from "../../container/RoleProvider";
import {
  CommentPayload,
  DeleteCommentPayload,
} from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";
import { formatDate } from "../../utils/date.helpers";
import EditPost from "./EditPost";

const Post = () => {
  const { slag } = useParams();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const { userID } = useUserDetails();

  const { data: postData, isLoading } = useQuery({
    queryKey: ["post-data", slag],
    queryFn: () => postAPI.getPostDetails(slag as string),
  });

  const { mutate, isLoading: loadingComment } = useMutation(
    (payload: CommentPayload) => postAPI.createComment(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("post-data");
        form.resetFields();
        message.success("Comment Successful");
      },
      onError: () => {
        notification.error({ message: "Error" });
      },
    }
  );

  const { mutate: mutateDeleteComment } = useMutation(
    ["comment-list"],
    (payload: DeleteCommentPayload) => postAPI.deleteComment(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("post-data");
      },
      onError: (error: Error) => {
        notification.error({ message: error.message });
      },
    }
  );

  return (
    <Skeleton loading={isLoading}>
      <div className="flex justify-center p-5">
        <Card
          className="max-w-[calc(100vh-200px)] min-w-[calc(100vh-200px)]"
          title={
            <CardMeta
              icon={
                <Avatar
                  className="mr-2"
                  src={postData?.data?.user?.profile_pic}
                />
              }
              title={postData?.data?.user?.name}
            />
          }
          extra={
            postData?.data?.user?.id === userID && (
              <EditPost postsDetails={postData?.data} />
            )
          }
        >
          <Row justify={"space-between"}>
            <Typography.Title className="mt-0" level={5}>
              {postData?.data?.title}
            </Typography.Title>
            {formatDate(postData?.data?.created_at)}
          </Row>
          {postData?.data?.attachments?.map((pic, i) =>
            pic ? <Image key={i} alt="example" src={pic} /> : ""
          )}
          <div className="mt-4 mb-4">{postData?.data?.body}</div>
          <Typography.Title level={5}>
            Comment ({postData?.data?.total_comments})
          </Typography.Title>

          {postData?.data?.comments?.map((comments, i) => (
            <Row key={i}>
              <Col>
                <Avatar src={comments?.user?.profile_pic} />
              </Col>
              <Col>
                <Card
                  className="bg-slate-100 w-56 ml-2 mt-2"
                  size="small"
                  title={
                    <div className="mt-4">
                      <Typography.Text>{comments?.user?.name}</Typography.Text>
                      <Typography.Paragraph>
                        {
                          <Typography.Paragraph type="secondary">
                            {formatDate(comments.created_at)}
                          </Typography.Paragraph>
                        }
                      </Typography.Paragraph>
                    </div>
                  }
                  extra={
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "member",
                            label: (
                              <Popconfirm
                                title="Delete Comment"
                                description="Are you sure want o delete this Comment?"
                                onConfirm={() =>
                                  mutateDeleteComment({
                                    comment_id: comments?.id,
                                    is_active: false,
                                  })
                                }
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
                  }
                >
                  {comments?.comment}
                </Card>
              </Col>
            </Row>
          ))}
          <Form
            form={form}
            onFinish={(values) => {
              mutate({
                comment: values.comment,
                post: slag,
              });
            }}
            className="mt-5"
          >
            <Form.Item name="comment">
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" loading={loadingComment} htmlType="submit">
                Comment
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Skeleton>
  );
};

export default Post;
