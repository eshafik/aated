import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  ApproveMembersPayload,
  MemberResponse,
  MembersListParams,
  MembersResponse,
} from "./@types/members";
import { HttpAuthService } from "./httpService/httpAuth.service";

class MembersAPI {
  constructor(private http: HttpAuthService) {}

  activeMembersList(params?: MembersListParams) {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", params?.limit?.toString() ?? "10");
    queryParams.append("page", params?.page?.toString() ?? "1");
    if (params?.name) queryParams.append("name", params?.name);
    if (params?.batch) queryParams.append("batch", params?.batch);
    if (params?.company_name)
      queryParams.append("company_name", params?.company_name);
    if (params?.designation)
      queryParams.append("designation", params?.designation);
    if (params?.location) queryParams.append("location", params?.location);
    if (params?.occupation_type)
      queryParams.append("occupation_type", params?.occupation_type.toString());
    if (params?.student_id)
      queryParams.append("student_id", params?.student_id.toString());
    if (params?.ordering)
      queryParams.append("ordering", params?.ordering.toString());

    return this.http.get<MembersResponse>(
      `api/v1/users/all-members/?${queryParams}`
    );
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
