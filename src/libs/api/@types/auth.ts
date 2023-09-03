export interface CreateUserPayload {
  email?: string;
  name?: string;
  phone?: string;
  password?: number;
  batch?: string;
  student_id?: string;
  passing_year?: string;
  otp?: string;
}

export interface CreateUserResponse {
  message?: string;
}

export interface VerifyOTP {
  email?: string;
  opt?: string;
}
