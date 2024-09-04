/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Card,
  Form,
  Image,
  Pagination,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useComment } from "../../../config/hook/usecomment";
import { usePostList } from "../../../config/hook/useSearch";
import { useUserDetails } from "../../../container/RoleProvider";
import { PostsDetails } from "../../../libs/api/@types/post";
import { formatDate } from "../../../utils/date.helpers";
import EditPost from "../../post/EditPost";

type PostProps = {
  postsData?: PostsDetails[];
  loadingPostList?: boolean;
  filter?: {
    handleChangePage: (
      page?: number | undefined,
      limit?: number | undefined
    ) => void;
    handleChangePosts: (post?: string | undefined) => void;
  };
};
const Posts: FC<PostProps> = ({ loadingPostList, postsData, filter }) => {
  const [showMore, setShowMore] = useState(false);
  const { userID } = useUserDetails();
  const { posts } = usePostList();

  const { mutate: mutateComment } = useComment();

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <Spin spinning={loadingPostList}>
          {postsData?.map((items, i) => (
            <Card
              className="mt-3"
              key={i}
              title={
                <Space>
                  <Avatar src={items?.user?.profile_pic} />
                  {items.user?.name}
                </Space>
              }
              extra={
                items?.user?.id == userID ? (
                  <EditPost postsDetails={items} />
                ) : (
                  ""
                )
              }
            >
              <Row justify="space-between">
                <Typography.Title className="mt-0" level={5}>
                  {items.title}
                </Typography.Title>
                <Typography.Paragraph>
                  {formatDate(items?.created_at)}
                </Typography.Paragraph>
              </Row>
              {items.attachments?.[0] && (
                <div className="text-center">
                  <Image className="max-h-80" src={items?.attachments?.[0]} />
                </div>
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

              <Link to={`${items?.id}`}>Comment ({items?.total_comments})</Link>

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
          current={posts?.meta_data?.page}
          total={posts?.meta_data?.count}
          onChange={filter?.handleChangePage}
          showTitle={true}
          showTotal={(total) => `Total ${total} Post`}
        />
      </div>
    </>
  );
};

export default Posts;
