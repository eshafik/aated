export interface UpdateProfileResponse {
  data?: {
    id?: number;
    batch?: {
      id?: number;
      name?: string;
      batch_number?: number;
    };
    occupation_type?: {
      id?: number;
      name?: string;
    };
    profile_pic?: string;
    last_login?: string;
    is_superuser?: boolean;
    username?: string;
    name?: string;
    email?: string;
    is_email_verified?: boolean;
    phone?: string;
    professional_designation?: string;
    batch_no?: number | string;
    employment_status?: string;
    unemployment_reasons: string;
    student_id: string | number;
    passing_year: string | number;
    expertise_area: string;
    contact_details: string;
    is_active: boolean;
  };
}

export interface SuperUser {
  data?: {
    id?: string | number;
    is_superuser?: boolean;
  };
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  student_id?: string | number;
  passing_year?: string | number;
  batch_no?: number | string;
  password?: string;
  profile_pic?: string;
}
