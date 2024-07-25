import { IJWTPayload } from "./IJWTPayload"
import { IRole } from "./IRole"

export interface ServerState {
  role: {
    [name: string]: IRole
  };
  userRoleId: string;
  adminRoleId: string;
  userId: string;
  adminId: string;
  jwt?: IJWTPayload;
}