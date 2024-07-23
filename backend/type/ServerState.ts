import { IJWTPayload } from "./IJWTPayload"
import { IRole } from "./IRole"

export interface ServerState {
  role: {
    [name: string]: IRole
  },
  userRoleId: string,
  adminRolesId: string,
  jwt?: IJWTPayload,
}