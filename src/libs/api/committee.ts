import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  Committee,
  CommitteeDetails,
  CommitteeMemberPayload,
  CommitteePayload,
  CommitteeResponse,
  CommitteeSample,
} from "./@types/committee";
import { HttpAuthService } from "./httpService/httpAuth.service";

class CommitteeAPI {
  constructor(private http: HttpAuthService) {}

  getCommitteeList() {
    return this.http.get<CommitteeResponse>("api/v1/committee/committee/");
  }

  getCommitteeDetails(id?: string) {
    return this.http.get<CommitteeDetails>(`api/v1/committee/committee/${id}/`);
  }

  updateCommittee(payload: CommitteePayload, id: string) {
    return this.http.patch<Committee>(
      `api/v1/committee/committee/${id}/`,
      payload
    );
  }

  createCommittee(payload: CommitteePayload) {
    return this.http.post(`api/v1/committee/committee/`, payload);
  }

  addCommitteeMember(payload: CommitteeMemberPayload) {
    return this.http.post(`api/v1/committee/committee-member/`, payload);
  }

  removeCommitteeMember(ID: string | number) {
    return this.http.delete(`api/v1/committee/committee-member/${ID}/`);
  }

  getCommitteeMembersList(id?: string) {
    // const queryParams = new URLSearchParams();
    // if (params?.id) queryParams.append("name", params?.id);
    return this.http.get<CommitteeSample>(
      `api/v1/committee/committee-member/${id}`
    );
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const committeeAPI = new CommitteeAPI(httpAuthService);
