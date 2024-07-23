export interface ReqUserCreate {
  username: string;
  password: string;
  name: string;
  admin?: boolean;
}