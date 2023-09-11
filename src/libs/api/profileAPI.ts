import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  ExperiencePayload,
  ExperienceResponse,
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

  addExperiences(payload: ExperiencePayload) {
    return this.http.post("api/v1/profiles/personal/experiences/", payload);
  }

  getExperiences() {
    return this.http.get<ExperienceResponse>(
      "api/v1/profiles/personal/experiences/"
    );
  }

  deleteExperiences(ID: string | number) {
    return this.http.delete(`api/v1/profiles/personal/experiences/${ID}`);
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const profileAPI = new ProfileAPI(httpAuthService);
