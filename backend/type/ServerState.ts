import { IRole } from "./IRole"

export interface ServerState {
  role: {
    [name: string]: IRole
  },
  userRoleId: string,
  adminRolesId: string,
}