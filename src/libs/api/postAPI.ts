import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  CommentPayload,
  CommentResponse,
  DeleteCommentPayload,
  PostListParams,
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

  postUpdate(ID?: string | number, payload?: PostPayload) {
    return this.http.patch(`api/v1/post/manage-post/${ID}/`, payload);
  }

  deletePost(ID?: string | number) {
    return this.http.delete(`api/v1/post/manage-post/${ID}/`);
  }

  getPostList(params?: PostListParams) {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", params?.limit?.toString() ?? "10");
    queryParams.append("page", params?.page?.toString() ?? "1");
    if (params?.search) queryParams.append("search", params.search);
    if (params?.category) queryParams.append("category", params.category);

    return this.http.get<PostsResponse>(
      `api/v1/post/manage-post/?${queryParams}`
    );
  }

  getPostDetails(ID?: string | number) {
    return this.http.get<PostResponse>(`api/v1/post/manage-post/${ID}/`);
  }

  createComment(payload: CommentPayload) {
    return this.http.post<CommentResponse>(`api/v1/post/comment/`, payload);
  }

  deleteComment(payload: DeleteCommentPayload) {
    return this.http.patch("api/v1/post/comment/", payload);
  }

  searchPost(postSearch: string | null) {
    return this.http.get<PostResponse>(
      `api/v1/post/manage-post/?search=${postSearch}`
    );
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const postAPI = new PostAPI(httpAuthService);
