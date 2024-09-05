/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Card,
  Form,
  Image,
  Row,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useComment } from "../../../config/hook/usecomment";
import { useUserDetails } from "../../../container/RoleProvider";
import { PostsDetails } from "../../../libs/api/@types/post";
import { formatDate } from "../../../utils/date.helpers";
import EditPost from "../../post/EditPost";

type PostsType = {
  postDate: PostsDetails;
};
const Posts = ({ postDate }: PostsType) => {
  const [showMore, setShowMore] = useState(false);
  const { userID } = useUserDetails();

  const { mutate: mutateComment } = useComment();

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card
        className="mt-3 bg-slate-100/50"
        title={
          <Space>
            <Avatar src={postDate?.user?.profile_pic} />
            {postDate.user?.name}
          </Space>
        }
        extra={
          postDate?.user?.id == userID ? (
            <EditPost postsDetails={postDate} />
          ) : (
            ""
          )
        }
      >
        <Row justify="space-between">
          <Typography.Title className="mt-0" level={5}>
            {postDate.title}
          </Typography.Title>
          <Typography.Paragraph>
            {formatDate(postDate?.created_at)}
          </Typography.Paragraph>
        </Row>
        {postDate.attachments?.[0] && (
          <div className="text-center">
            <Image className="max-h-80" src={postDate?.attachments?.[0]} />
          </div>
        )}

        <div className="mb-4">
          {showMore ? postDate?.body : `${postDate?.body?.substring(0, 250)}`}
          {postDate?.body?.length > 250 ? (
            <Link onClick={() => setShowMore(!showMore)} to={`${postDate?.id}`}>
              ...See more
            </Link>
          ) : (
            ""
          )}
        </div>

        <Link to={`${postDate?.id}`}>Comment ({postDate?.total_comments})</Link>

        <Form
          onFinish={(values) =>
            mutateComment({
              comment: values?.comment,
              post: postDate?.id,
            })
          }
        >
          <Form.Item name={"comment"}>
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Comment
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Posts;
