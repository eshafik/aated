export interface PostPayload {
  category?: string | number;
  title?: string;
  body?: string;
  attachments?: string;
}

export interface PostsResponse {
  data?: [
    {
      id: string;
      category?: {
        id: number | string;
        name?: string;
      };
      title?: string;
      body: string;
      attachments?: string[];
      created_at: Date | string;
      total_comments?: number;
      user?: {
        id?: string | number;
        name?: string;
        user?: string;
        email?: string;
        profile_pic?: string;
      };
    }
  ];
}

export interface PostResponse {
  data?: {
    id?: string | number;
    created_at: Date | string;
    category?: {
      id: number | string;
      name?: string;
    };
    title?: string;
    body?: string;
    attachments?: string[];
    total_comments?: number;
    user?: {
      id?: string | number;
      name?: string;
      user?: string;
      email?: string;
      profile_pic?: string;
    };
    comments?: [
      {
        id: number;
        comment: string;
        user: User;
        created_at: Date | string;
      }
    ];
  };
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  profile_pic: string;
}

export interface CommentPayload {
  post?: string | number;
  comment?: string;
}

export interface CommentResponse {
  data?: {
    id?: string | number;
    comment?: string;
    post?: string | number;
    user?: {
      id?: string | number;
      name?: string;
      username?: string;
      email?: string;
      profile_pic?: string;
    };
  };
}

export interface DeleteCommentPayload {
  comment_id?: string | number;
  is_active?: boolean;
}

export interface PostSearchPayload {
  value?: string;
}

export interface PostListParams {
  id?: string;
  limit?: number;
  page?: number;
  search?: string;
  category?: string;
}
