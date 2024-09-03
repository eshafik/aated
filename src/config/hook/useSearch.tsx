import { useState } from "react";
import { useQuery } from "react-query";
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
    setFilters((prev) => ({ ...prev, category: post }));
  };

  const handleChangeStatus = (status: boolean) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["post-list", filters],
    queryFn: () => postAPI.getPostList(filters),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data!.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  return {
    posts: data,
    isLoading,
    isFetching,
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
