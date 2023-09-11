export interface PostPayload {
  category?: string | number;
  title?: string;
  body?: string;
  attachments?: string[];
}

export interface PostsResponse {
  data?: [
    {
      id: string | number;
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
    }
  ];
}

export interface PostResponse {
  data?: {
    id?: string | number;
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
    user?: {
      id?: string | number;
      name?: string;
      username?: string;
      email?: string;
      profile_pic?: string;
    };
  };
}

export interface DeletePostPayload {
  comment?: string | number;
  is_active?: boolean;
}

export interface PostSearchPayload {
  value?: string;
}
