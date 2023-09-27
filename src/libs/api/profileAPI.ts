import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  BatchList,
  ExperiencePayload,
  ExperienceResponse,
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

  getBatchList() {
    return this.http.get<BatchList>("api/v1/core/public/batches?limit=200");
  }

  getProfileDetails() {
    return this.http.get<UpdateProfileResponse>(
      "api/v1/profiles/personal/profile/"
    );
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
