export interface CommitteeResponse {
  data?: [
    {
      id?: string | number;
      start_date?: string;
      end_date?: string;
      is_active?: boolean;
      name?: string;
      created_by?: {
        id?: string | number;
        name?: string;
        username?: string;
        email?: string;
        profile_pic?: string;
      };
      updated_by?: null;
    }
  ];
}

export interface Committee {
  id?: string | number;
  start_date?: string;
  end_date?: string;
  is_active?: boolean;
  name?: string;
  created_by?: {
    id?: string | number;
    name?: string;
    username?: string;
    email?: string;
    profile_pic?: string;
  };
  updated_by?: null;
}

export interface CommitteePayload {
  id?: string | number;
  start_date?: string;
  end_date?: string;
  is_active?: boolean;
  name?: string;
}

export interface CommitteeMemberPayload {
  committee?: string | number;
  member?: string | number;
  committee_designation?: string;
  position_order?: number;
}
