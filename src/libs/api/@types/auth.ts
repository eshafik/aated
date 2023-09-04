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

export interface LoginPayload {
  username?: string;
  password?: string;
}

export interface LoginResponse {
  data: {
    refresh: string;
    access: string;
    role: string;
    id: string | number;
  };
}
