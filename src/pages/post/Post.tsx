import {
  Avatar,
  Button,
  Card,
  Form,
  Col,
  Row,
  Typography,
  Skeleton,
  Image,
  message,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { postAPI } from "../../libs/api/postAPI";
import TextArea from "antd/es/input/TextArea";
import { DeleteTwoTone } from "@ant-design/icons";
import { CommentPayload } from "../../libs/api/@types/post";

const Post = () => {
  const { slag } = useParams();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data: postData, isLoading } = useQuery(["post-data"], () =>
    postAPI.getPostDetails(slag as string)
  );

  const { mutate, isLoading: loadingComment } = useMutation(
    (payload: CommentPayload) => postAPI.createComment(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("post-data");
        form.resetFields();
        message.success("Comment Successful");
      },
    }
  );

  return (
    <Row align={"middle"} justify={"center"}>
      <Col>
        <Skeleton loading={isLoading}>
          <Card
            className="max-w-2xl"
            title={
              <>
                <Avatar
                  className="mr-2"
                  src={postData?.data?.user?.profile_pic}
                />
                {postData?.data?.user?.name}
              </>
            }
          >
            <div className="text-black font-bold text-xl">
              {postData?.data?.title}
            </div>
            {postData?.data?.attachments?.map((pic) =>
              pic ? <Image alt="example" src={pic} /> : ""
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
                    title={comments?.user?.name}
                    extra={<DeleteTwoTone />}
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
                <Button
                  loading={loadingComment}
                  className="bg-yellow-300"
                  htmlType="submit"
                >
                  Comment
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Skeleton>
      </Col>
    </Row>
  );
};

export default Post;
