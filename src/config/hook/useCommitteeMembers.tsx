// import { useState } from "react";
// import { useQuery } from "react-query";
// import { CommitteeId } from "../../libs/api/@types/committee";
// import { CommitteeID } from "../../libs/api/@types/members";
// import { committeeAPI } from "../../libs/api/committee";

// interface CommitteeIDParams {
//   filters?: CommitteeID;
// }

// export const useCommitteeMembersList = (params?: CommitteeIDParams) => {
//   const [filters, setFilters] = useState<CommitteeId | undefined>(
//     params?.filters
//   );

//   const handleChangeCommitteeID = (post?: string) => {
//     setFilters((prev) => ({ ...prev, id: post }));
//   };

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["members-list", filters],
//     queryFn: () => committeeAPI.getCommitteeDetails(filters),
//   });

//   return {
//     data,
//     isLoading,
//     refetch,
//     filter: {
//       filters,
//       handleChangeCommitteeID,
//     },
//   };
// };
