export interface CreateUserPayload {
  email?: string;
  name?: string;
  phone?: string;
  password?: number;
  batch?: string;
  student_id?: string;
  passing_year?: string;
}

export interface CreateUserResponse {
  message?: string;
}
