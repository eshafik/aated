import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { PostListParams } from "../../libs/api/@types/post";
import { postAPI } from "../../libs/api/postAPI";

export const usePostList = () => {
  const [filters, setFilters] = useState<PostListParams | undefined>();

  const handleChangePosts = (post?: string) => {
    setFilters((prev) => ({ ...prev, search: post }));
  };

  const handleChangePage = (page?: number, limit?: number) => {
    setFilters((prev) => ({ ...prev, page, limit }));
  };

  const handleChangeCategory = (post?: string) => {
    setFilters((prev) => ({
      ...prev,
      category: post === "0" ? undefined : post,
    }));
  };

  const handleChangeStatus = (status: boolean) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const { data, isLoading, refetch, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["post-list", filters],
      queryFn: ({ pageParam = 1 }) =>
        postAPI.getPostList({
          category: filters?.category,
          id: filters?.id,
          search: filters?.search,
          page: pageParam,
        }),
      getNextPageParam: (lastPage) => {
        if (lastPage?.meta_data?.next === 0) {
          return undefined;
        }
        return lastPage?.meta_data?.next;
      },
    });

  return {
    posts: data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
    filter: {
      filters,
      handleChangePage,
      handleChangePosts,
      handleChangeStatus,
      handleChangeCategory,
    },
  };
};
