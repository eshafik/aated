import {
  Avatar,
  Card,
  Divider,
  Form,
  Input,
  Select,
  Skeleton,
  Tabs,
  Typography,
} from "antd";
import moment from "moment";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import CardMeta from "../../components/CardMeta";
import { useMatchMedia } from "../../components/useMatchMedia";
import { usePostList } from "../../config/hook/useSearch";
import Scaffold from "../../container/layout/Scaffold";
import { postAPI } from "../../libs/api/postAPI";
import CreatePostModal from "./component/CreatePostModal";
import Posts from "./component/Posts";

const BlogPost = () => {
  const { filter, isLoading, posts } = usePostList();
  const [category, setCategory] = useState("all_post");

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

  const isMobileScreen = useMatchMedia();

  const renderPostType = useMemo(() => {
    if (isMobileScreen && category === "job_post") {
      return "job_post";
    }
    if (isMobileScreen && category === "all_post") {
      return "all_post";
    } else if (!isMobileScreen) return "all";
  }, [category, isMobileScreen]);

  console.log(renderPostType);

  return (
    <Skeleton loading={jobPostQuery?.isLoading && isLoading}>
      <Scaffold
        extra={
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
        }
      >
        {isMobileScreen && (
          <Tabs
            className="col-span-12"
            onChange={(key) => setCategory(key)}
            items={[
              {
                label: "All Post",
                key: "all_post",
              },
              {
                label: "Job Post",
                key: "job_post",
              },
            ]}
          />
        )}
        <div className="grid grid-cols-12 gap-10">
          {(renderPostType === "all_post" || renderPostType === "all") && (
            <div
              className={twMerge(
                "col-span-12 flex flex-col",
                !isMobileScreen && "col-span-6"
              )}
            >
              <CreatePostModal />
              <Posts
                postsData={excludeJobPosts}
                loadingPostList={isLoading}
                filter={filter}
              />
            </div>
          )}

          {(renderPostType === "job_post" || renderPostType === "all") && (
            <div
              className={twMerge(
                "col-span-12",
                !isMobileScreen && "col-span-6 mt-[11px]"
              )}
            >
              <Card title="Job Posts">
                {jobPostQuery?.data?.data?.map((items, index) => (
                  <div className="flex flex-col gap-5" key={index}>
                    <CardMeta
                      icon={<Avatar src={items?.attachments?.[0]} />}
                      title={
                        <Typography.Text className="text-xs font-bold">
                          {items?.title}
                        </Typography.Text>
                      }
                      description={
                        <Typography.Text
                          className="text-xs mt-0"
                          type="secondary"
                        >
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
          )}
        </div>
      </Scaffold>
    </Skeleton>
  );
};

export default BlogPost;
