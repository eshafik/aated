import { Batch } from "./members";

export interface CommitteeResponse {
  data?: Committee[];
}

export interface Committee {
  id: number;
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

export interface CommitteeMemberResponse {
  meta_data: {
    count: number;
    page_size?: number;
  };
  data?: [
    {
      id?: string | number;
      member?: {
        id?: string | number;
        name?: string;
        email?: string;
        phone?: string;
        batch?: Batch;
        student_id?: string;
        passing_year?: number | string;
      };
      committee_designation?: string;
      position_order?: number | string;
    }
  ];
}

export interface CommitteeMembers {
  id?: string | number;
  member?: {
    id?: string | number;
    name?: string;
    email?: string;
    phone?: string;
    batch?: Batch;
    student_id?: string;
    passing_year?: number | string;
  };
  committee_designation?: string;
  position_order?: number | string;
}

export type CommitteeId = {
  id?: string;
};
