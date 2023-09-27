export interface CreateUserPayload {
  email: string | null;
  name?: string;
  phone?: string;
  password?: string;
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
  otp?: string;
  password?: string;
}

export interface LoginPayload {
  username?: string;
  password?: string;
}

export type ForgotPasswordPayload = Omit<VerifyOTP, "otp">;
export type ResetPasswordPayload = VerifyOTP;

export interface LoginResponse {
  data: {
    refresh: string;
    access: string;
    role: string;
    id: string | number;
  };
}
