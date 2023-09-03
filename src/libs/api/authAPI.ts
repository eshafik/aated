import config from "../../config";
import { authService } from "../auth/auth.service";
import { CreateUserPayload, CreateUserResponse } from "./@types/auth";
import { HttpAuthService } from "./httpService/httpAuth.service";

class AuthAPI {
  constructor(private http: HttpAuthService) {}

  createUser(payload: CreateUserPayload) {
    return this.http.post<CreateUserResponse>("api/v1/users/sign-up/", payload);
  }

  // verifuotp(payload: VerifyOTP) {
  //   return this.http.post("api/v1/users/sign-up", payload);
  // }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const authAPI = new AuthAPI(httpAuthService);
