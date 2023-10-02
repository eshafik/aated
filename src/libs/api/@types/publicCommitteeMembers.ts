export type PublicCommitteeMember = {
  data?: [
    {
      id?: string | number;
      name?: string;
      profile_pic?: string;
      committee_designation?: string;
      position_order?: number;
      details?: [];
    }
  ];
};
