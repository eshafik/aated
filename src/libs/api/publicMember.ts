import config from "../../config";
import { authService } from "../auth";
import { HttpAuthService } from "./httpService/httpAuth.service";

class PublicCommitteeMembers {
  constructor(private http: HttpAuthService) {}

  getPublicCommitteeMembers() {
    return this.http.get("api/v1/committee/public/committee-member?limit=200");
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const publicCommitteeMemberAPI = new PublicCommitteeMembers(
  httpAuthService
);
