import { useState } from "react";
import { useQuery } from "react-query";
import { CommitteeListParams } from "../../libs/api/@types/committee";
import { committeeAPI } from "../../libs/api/committee";

export const useCommitteeList = () => {
  const [filters, setFilters] = useState<CommitteeListParams>();

  const handleChangePage = (page?: number, limit?: number) => {
    setFilters((prev) => ({ ...prev, page, limit }));
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["committee-list", filters],
    queryFn: () => committeeAPI.getCommitteeList(filters),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta_data?.next) return lastPage.meta_data.next;
      return undefined;
    },
  });

  return {
    committeeData: data,
    isLoading,
    refetch,
    filter: {
      filters,
      handleChangePage,
    },
  };
};
