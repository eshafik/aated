import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  CommentPayload,
  CommentResponse,
  DeletePostPayload,
  PostPayload,
  PostResponse,
  PostsResponse,
} from "./@types/post";
import { HttpAuthService } from "./httpService/httpAuth.service";

class PostAPI {
  constructor(private http: HttpAuthService) {}

  createPost(payload: PostPayload) {
    return this.http.post("api/v1/post/manage-post/", payload);
  }

  postUpdate(ID: string | number, payload: PostPayload) {
    return this.http.patch(`api/v1/post/manage-post/${ID}`, payload);
  }

  deletePost(ID: string | number) {
    return this.http.delete(`api/v1/post/manage-post/${ID}`);
  }

  getPostList() {
    return this.http.get<PostsResponse>("api/v1/post/manage-post");
  }

  getPostDetails(ID: string | number) {
    return this.http.get<PostResponse>(`api/v1/post/manage-post/${ID}`);
  }

  createComment(payload: CommentPayload) {
    return this.http.post<CommentResponse>(`api/v1/post/comment/`, payload);
  }

  deleteComment(payload: DeletePostPayload) {
    return this.http.patch("api/v1/post/comment/", payload);
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const postAPI = new PostAPI(httpAuthService);
