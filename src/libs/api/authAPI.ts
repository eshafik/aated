import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  CreateUserPayload,
  CreateUserResponse,
  LoginPayload,
  LoginResponse,
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
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const authAPI = new AuthAPI(httpAuthService);
