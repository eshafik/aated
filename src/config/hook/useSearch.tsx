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
  const [id, setid] = useState<PostListParams | undefined>(params?.filters);

  const handleChangePosts = (post?: string) => {
    setFilters((prev) => ({ ...prev, search: post }));
  };

  const handleChangeTabs = (post?: string) => {
    setid({ id: post });
  };

  const handleChangeStatus = (status: boolean) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["post-list", filters, id],
    queryFn: () => postAPI.getPostList(filters),
  });

  return {
    posts: data,
    isLoading,
    refetch,
    filter: {
      filters,
      handleChangePosts,
      handleChangeStatus,
      handleChangeTabs,
    },
  };
};
