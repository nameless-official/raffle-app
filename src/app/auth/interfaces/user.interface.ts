export interface User {
  user_id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  status: boolean;
  roles?: string[];
}
