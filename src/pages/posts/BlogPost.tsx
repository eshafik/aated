import {
  Avatar,
  Card,
  Divider,
  Form,
  Input,
  Select,
  Skeleton,
  Typography,
} from "antd";
import moment from "moment";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import CardMeta from "../../components/CardMeta";
import { useMatchMedia } from "../../components/useMatchMedia";
import { usePostList } from "../../config/hook/useSearch";
import { postAPI } from "../../libs/api/postAPI";
import CreatePostModal from "./component/CreatePostModal";
import Posts from "./Posts";

const BlogPost = () => {
  const { filter, isLoading, posts } = usePostList();
  const isDesktopResolution = useMatchMedia("(min-width:600px)", true);

  const excludeJobPosts = posts?.data?.filter(
    (item) => item.category?.id.toString() !== "1"
  );

  const jobPostQuery = useQuery({
    queryKey: ["job-post-list"],
    queryFn: () =>
      postAPI.getPostList({
        category: "1",
      }),
  });

  return (
    <Skeleton loading={jobPostQuery?.isLoading && isLoading}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 flex flex-col">
          <Card
            size="small"
            className="sticky top-2 z-10 drop-shadow "
            style={{ width: isDesktopResolution ? 650 : 490 }}
          >
            <Form>
              <div className="flex gap-2">
                <Input.Search
                  placeholder="Search Post"
                  allowClear
                  onSearch={filter?.handleChangePosts}
                />
                <Select
                  placeholder="Select Category"
                  onSelect={(key) => filter.handleChangeCategory(key)}
                  allowClear
                  options={[
                    {
                      value: "0",
                      label: "All Post",
                    },
                    //   {
                    //     value: "1",
                    //     label: "Job Post",
                    //   },
                    {
                      value: "2",
                      label: "Notice",
                    },
                    {
                      value: "3",
                      label: "General Post",
                    },
                    {
                      value: "4",
                      label: "Help Post",
                    },
                  ]}
                />
              </div>
            </Form>
          </Card>
          <CreatePostModal />
          <Posts
            postsData={excludeJobPosts}
            loadingPostList={isLoading}
            filter={filter}
          />
        </div>
        <div className="col-span-6 mt-[68px]">
          <Card title="Job Posts">
            {jobPostQuery?.data?.data?.map((items, index) => (
              <div className="flex flex-col gap-5">
                <CardMeta
                  icon={<Avatar src={items?.attachments?.[0]} />}
                  title={
                    <Typography.Text className="text-xs font-bold">
                      {items?.title}
                    </Typography.Text>
                  }
                  description={
                    <Typography.Text className="text-xs mt-0" type="secondary">
                      {moment(items?.created_at).format("lll")}
                    </Typography.Text>
                  }
                />
                <Typography.Text className="text-clip">
                  {`${items?.body.substring(0, 250)}`}
                  {Number(items?.body?.length) > 250 ? "......" : ""}
                </Typography.Text>
                <Link
                  to={String(items.id)}
                  className="underline text-black text-xs"
                >
                  More Details
                </Link>
                {Number(jobPostQuery?.data?.data?.length) - 1 !== index && (
                  <Divider />
                )}
              </div>
            ))}
          </Card>
        </div>
      </div>
    </Skeleton>
  );
};

export default BlogPost;
