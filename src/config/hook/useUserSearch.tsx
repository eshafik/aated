import { useState } from "react";
import { useQuery } from "react-query";
import { MembersListParams } from "../../libs/api/@types/members";
import { membersAPI } from "../../libs/api/membersAPI";

export const useMemberList = () => {
  const [filters, setFilters] = useState<MembersListParams>();
  const [isModalDisable, setModalDisable] = useState(false);

  const handleChangePage = (page: number, limit: number) => {
    setFilters((prev) => ({ ...prev, page, limit }));
  };

  const handleChangeName = (member?: string) => {
    setFilters((prev) => ({ ...prev, name: member }));
  };

  const handleChangeOrdering = (member?: string) => {
    setFilters((prev) => ({ ...prev, ordering: member }));
  };

  const handleChangeDesignation = (member?: string) => {
    setFilters((prev) => ({ ...prev, designation: member }));
  };

  const handleChangeOccupation = (member?: string) => {
    setFilters((prev) => ({ ...prev, occupation_type: member }));
  };

  const handleChangeStudentId = (member?: string) => {
    setFilters((prev) => ({ ...prev, student_id: member }));
  };

  const handleChangeLocation = (member?: string) => {
    setFilters((prev) => ({ ...prev, location: member }));
  };
  const handleChangeCompany = (member?: string) => {
    setFilters((prev) => ({ ...prev, company_name: member }));
  };

  const handleChangeJobDepartment = (member?: string) => {
    setFilters((prev) => ({ ...prev, job_department: member }));
  };

  const handleChangeSkills = (member?: string) => {
    setFilters((prev) => ({ ...prev, skills: member }));
  };

  const handleChangeEmployeeStatus = (member?: string) => {
    setFilters((prev) => ({ ...prev, employment_status: member }));
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["members-list", filters],
    queryFn: () => membersAPI.activeMembersList(filters),
    onSuccess: () => {
      setModalDisable(true);
    },
  });

  return {
    data,
    isLoading,
    refetch,
    isModalDisable,
    filter: {
      filters,
      handleChangeOrdering,
      handleChangeName,
      handleChangeCompany,
      handleChangeDesignation,
      handleChangeJobDepartment,
      handleChangeLocation,
      handleChangeOccupation,
      handleChangeStudentId,
      handleChangeSkills,
      handleChangeEmployeeStatus,
      handleChangePage,
    },
  };
};
