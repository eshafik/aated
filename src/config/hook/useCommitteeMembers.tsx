import { useState } from "react";
import { useQuery } from "react-query";
import { CommitteeId } from "../../libs/api/@types/committee";
import { committeeAPI } from "../../libs/api/committee";

interface MembersListParams {
  filters?: CommitteeId;
}

export const useCommitteeMembersList = (params?: MembersListParams) => {
  const [filters, setFilters] = useState<CommitteeId | undefined>(
    params?.filters
  );

  const handleChangeCommittee = (post?: string) => {
    setFilters((prev) => ({ ...prev, id: post }));
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["members-list", filters],
    queryFn: () => committeeAPI.getCommitteeMembersList(filters),
  });

  return {
    members: data,
    isLoading,
    refetch,
    filter: {
      filters,
      handleChangeCommittee,
    },
  };
};
