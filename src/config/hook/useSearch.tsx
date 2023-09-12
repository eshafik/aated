import { useState } from "react";
import { PostListParams } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";
import { useQuery } from "react-query";

interface PostsListHookParams {
  filters?: PostListParams;
}

export const usePostList = (params?: PostsListHookParams) => {
  const [filters, setFilters] = useState<PostListParams | undefined>(
    params?.filters
  );

  const handleChangePosts = (post?: string) => {
    setFilters({ search: post });
  };

  const { data, isLoading, refetch } = useQuery(["post-list", filters], () =>
    postAPI.getPostList(filters)
  );

  return {
    posts: data,
    isLoading,
    refetch,
    filter: {
      filters,
      handleChangePosts,
    },
  };
};
