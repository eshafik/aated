import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  ExperiencePayload,
  ExperienceResponse,
  ExperiencesResponse,
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

  addExperiences(payload: ExperiencePayload) {
    return this.http.post("api/v1/profiles/personal/experiences/", payload);
  }

  getExperiences() {
    return this.http.get<ExperiencesResponse>(
      `api/v1/profiles/personal/experiences/`
    );
  }

  getExperience(id: string | number) {
    return this.http.get<ExperienceResponse>(
      `api/v1/profiles/personal/experiences/${id}/`
    );
  }

  updateExperience(payload: ExperiencePayload, id?: string | number) {
    return this.http.patch(
      `api/v1/profiles/personal/experiences/${id}/`,
      payload
    );
  }

  deleteExperiences(ID?: string) {
    return this.http.delete(`api/v1/profiles/personal/experiences/${ID}`);
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const profileAPI = new ProfileAPI(httpAuthService);
