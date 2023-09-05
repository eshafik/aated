import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  CreateUserPayload,
  CreateUserResponse,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  ResetPasswordPayload,
} from "./@types/auth";
import { HttpAuthService } from "./httpService/httpAuth.service";

class AuthAPI {
  constructor(private http: HttpAuthService) {}

  createUser(payload: CreateUserPayload) {
    return this.http.post<CreateUserResponse>("api/v1/users/sign-up/", payload);
  }

  loginUser(payload: LoginPayload) {
    return this.http.post<LoginResponse>("api/v1/users/token/", payload);
  }

  forgotPassword(payload: ForgotPasswordPayload) {
    return this.http.post("api/v1/users/forgot-password/", payload);
  }

  resetPassword(payload: ResetPasswordPayload) {
    return this.http.post("api/v1/users/forgot-password/", payload);
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const authAPI = new AuthAPI(httpAuthService);
