import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  Committee,
  CommitteeMemberPayload,
  CommitteeMemberResponse,
  CommitteePayload,
  CommitteeResponse,
} from "./@types/committee";
import { HttpAuthService } from "./httpService/httpAuth.service";

class CommitteeAPI {
  constructor(private http: HttpAuthService) {}

  getcommitteeList() {
    return this.http.get<CommitteeResponse>("api/v1/committee/committee/");
  }

  getCommitteeDetails() {
    return this.http.get<Committee>("api/v1/committee/committee/");
  }

  updateCommittee(ID: string | number, payload: CommitteePayload) {
    return this.http.patch<Committee>(
      `api/v1/committee/committee/${ID}/`,
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

  getcommitteeMembersList(ID: string | number) {
    return this.http.get<CommitteeMemberResponse>(
      `api/v1/committee/committee-member?committee_id=${ID}`
    );
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const committeeAPI = new CommitteeAPI(httpAuthService);
