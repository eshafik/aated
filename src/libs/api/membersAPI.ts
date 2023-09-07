import config from "../../config";
import { authService } from "../auth/auth.service";
import { MembersResponse } from "./@types/members";
import { HttpAuthService } from "./httpService/httpAuth.service";

class MembersAPI {
  constructor(private http: HttpAuthService) {}

  membersList() {
    return this.http.get<MembersResponse>("api/v1/users/all-members/");
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const membersAPI = new MembersAPI(httpAuthService);
