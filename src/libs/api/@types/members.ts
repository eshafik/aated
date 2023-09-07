export interface MembersResponse {
  data?: [
    {
      id: number | string;
      batch: Batch;
      occupation_type: OccupationType;
      profile_pic: string;
      last_login: string;
      is_superuser: boolean;
      username: string;
      name: string;
      email: string;
      is_email_verified: boolean;
      phone: string;
      professional_designation: string;
      batch_no: number;
      employment_status: string;
      unemployment_reasons: string;
      student_id: string;
      passing_year: number;
      expertise_area: string;
      contact_details: string;
      is_active: boolean;
    }
  ];
}

export interface Batch {
  id: number | string;
  name: string;
  batch_number: number;
}

export interface OccupationType {
  id: number | string;
  name: string;
}
