import { Tabs, theme } from "antd";
import { usePostList } from "../../config/hook/useSearch";
import Posts from "./Posts";

const PostContainer = () => {
  const { token } = theme.useToken();

  const { filter, isLoading, posts } = usePostList();

  const items = [
    {
      key: "",
      label: "All Post",
      children: (
        <Posts filter={filter} loadingPostList={isLoading} postsData={posts} />
      ),
    },
    {
      key: "1",
      label: "Job Post",
      children: (
        <Posts filter={filter} loadingPostList={isLoading} postsData={posts} />
      ),
    },
    {
      key: "2",
      label: "Notice",
      children: (
        <Posts filter={filter} loadingPostList={isLoading} postsData={posts} />
      ),
    },
    {
      key: "3",
      label: "General Post",
      children: (
        <Posts filter={filter} loadingPostList={isLoading} postsData={posts} />
      ),
    },
    {
      key: "4",
      label: "Help Post",
      children: (
        <Posts filter={filter} loadingPostList={isLoading} postsData={posts} />
      ),
    },
  ];

  return (
    <div className="grid justify-center bg-inherit ">
      <Tabs
        items={items}
        onTabClick={(categoryID) => filter.handleChangeCategory(categoryID)}
        tabBarStyle={{
          backgroundColor: token.colorBgLayout,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      />
    </div>
  );
};

export default PostContainer;
