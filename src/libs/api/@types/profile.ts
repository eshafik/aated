import { Batch } from "./members";

// export interface UserProfileResponse {
//   data?: {
//     id?: number | string;
//     batch?: {
//       id?: number;
//       name?: string;
//       batch_number?: number;
//     };
//     occupation_type?: {
//       id?: number;
//       name?: string;
//     };
//     profile_pic?: string;
//     last_login?: string;
//     is_superuser?: boolean;
//     username?: string;
//     name?: string;
//     email?: string;
//     is_email_verified?: boolean;
//     phone?: string;
//     professional_designation?: string;
//     batch_no?: number | string;
//     employment_status?: string;
//     unemployment_reasons: string;
//     student_id: string | number;
//     passing_year: string | number;
//     expertise_area: string;
//     contact_details: string;
//     is_active: boolean;
//   };
// }

export interface SuperUser {
  data?: {
    id?: string | number;
    is_superuser?: boolean;
  };
}

export interface UpdateProfilePayload {
  id?: string | number;
  batch?: Batch;
  occupation_type?: OccupationType;
  profile_pic?: string;
  last_login?: string;
  is_superuser?: boolean;
  username?: string;
  name?: string;
  email?: string;
  is_email_verified?: boolean;
  phone?: string;
  professional_designation?: string;
  batch_no?: number;
  employment_status?: string;
  unemployment_reasons?: string;
  student_id?: string;
  passing_year?: string;
  expertise_area?: string;
  contact_details?: string;
  is_active?: boolean;
  password?: string;
  email_notification?: boolean;
}

export interface OccupationType {}

export type Experience = {
  id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string[];
  updated_by: string[];
  designation: string;
  company_name: string;
  start: string;
  end: string;
  working_years: number;
  job_location: string;
  responsibilities: string;
  user: number;
  job_department: {
    id?: number | string;
    name?: string;
  };
};

export interface ExperiencesResponse {
  data?: Experience[];
}

export type ExperienceResponse = {
  data?: {
    id: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    created_by: string[];
    updated_by: string[];
    designation: string;
    company_name: string;
    start: string;
    end: string;
    working_years: number;
    job_location: string;
    responsibilities: string;
    user: number;
    job_department: {
      id?: number | string;
      name?: string;
    };
  };
};

export interface ExperiencePayload {
  id?: number | string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string[];
  updated_by?: string[];
  designation?: string;
  company_name?: string;
  start?: string;
  end?: string;
  working_years?: number;
  job_location?: string;
  responsibilities?: string;
  user?: number;
  job_department?: string;
}
