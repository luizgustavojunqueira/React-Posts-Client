export type Post = {
  post_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  user_full_name: string;
};

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  posts: Post[];
};
