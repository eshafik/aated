import { useState } from "react";
import { useQuery } from "react-query";
import { SearchQuery } from "../../libs/api/@types/search";
import { searchAPI } from "../../libs/api/searchAPI";

interface SearchJobDeptProps {
  filters?: SearchQuery;
}

export const useJobDeptSearch = (params?: SearchJobDeptProps) => {
  const [filters, setFilters] = useState<SearchQuery | undefined>(
    params?.filters
  );

  const handleChangeJobDept = (post?: string) => {
    setFilters((prev) => ({ ...prev, search: post }));
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["job-dept", filters],
    queryFn: () => searchAPI.getJobDepartment(filters),
  });

  return {
    jobDept: data,
    isLoading,
    refetch,
    filter: {
      filters,
      handleChangeJobDept,
    },
  };
};
