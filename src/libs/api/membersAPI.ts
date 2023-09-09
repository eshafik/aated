import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  ApproveMembersPayload,
  MemberResponse,
  MembersResponse,
} from "./@types/members";
import { HttpAuthService } from "./httpService/httpAuth.service";

class MembersAPI {
  constructor(private http: HttpAuthService) {}

  activeMembersList() {
    return this.http.get<MembersResponse>("api/v1/users/all-members/");
  }

  pendingMembersList() {
    return this.http.get<MembersResponse>("api/v1/users/pending-members/");
  }

  getMemberDetails(ID: string | number) {
    return this.http.get<MemberResponse>(`api/v1/users/all-members/${ID}`);
  }

  approveMembers(payload: ApproveMembersPayload) {
    return this.http.post("api/v1/users/pending-members/", payload);
  }

  updateMemberRole(payload: ApproveMembersPayload) {
    return this.http.post(`api/v1/users/manage-role/`, payload);
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const membersAPI = new MembersAPI(httpAuthService);
