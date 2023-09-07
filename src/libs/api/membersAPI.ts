import config from "../../config";
import { authService } from "../auth/auth.service";
import { MembersResponse } from "./@types/members";
import { HttpAuthService } from "./httpService/httpAuth.service";

class MembersAPI {
  constructor(private http: HttpAuthService) {}

  activeMembersList() {
    return this.http.get<MembersResponse>("api/v1/users/all-members/");
  }

  pendingMembersList() {
    return this.http.get<MembersResponse>("api/v1/users/pending-members/");
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const membersAPI = new MembersAPI(httpAuthService);
