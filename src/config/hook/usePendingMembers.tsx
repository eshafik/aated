import { App } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { MembersListParams } from "../../libs/api/@types/members";
import { membersAPI } from "../../libs/api/membersAPI";

export const usePendingMemberList = () => {
  const { notification } = App.useApp();
  const [filters, setFilters] = useState<MembersListParams>();

  const handleChangePage = (page: number, limit: number) => {
    setFilters((prev) => ({ ...prev, page, limit }));
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pendingMembers-list", filters],
    queryFn: () => membersAPI.pendingMembersList(filters),
    onError: () => {
      notification.error({ message: "You do not have permission" });
    },
  });

  return {
    data,
    isLoading,
    refetch,
    filter: {
      filters,
      handleChangePage,
    },
  };
};
