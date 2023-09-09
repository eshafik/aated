import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  SuperUser,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from "./@types/profile";
import { HttpAuthService } from "./httpService/httpAuth.service";

class ProfileAPI {
  constructor(private http: HttpAuthService) {}

  updateProfileDetails(payload: UpdateProfilePayload) {
    return this.http.patch<UpdateProfileResponse>(
      "api/v1/profiles/personal/profile/",
      payload
    );
  }

  getProfileDetails() {
    return this.http.get<UpdateProfileResponse>(
      "api/v1/profiles/personal/profile/"
    );
  }

  superUserCheck() {
    return this.http.get<SuperUser>("api/v1/profiles/personal/profile/");
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const profileAPI = new ProfileAPI(httpAuthService);
