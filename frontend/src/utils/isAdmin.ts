import { UserIdDto, UserRole } from "services/backend/client.generated";

export const isAdmin = (_user: UserIdDto) => {
  // if (accounts && accounts.length >= 1 && accounts[0].idTokenClaims != null) {
  //   const roles: string[] = accounts[0].idTokenClaims['roles'];
  //   return roles != null && (roles.indexOf('Administrator-Prod') >= 0 || roles.indexOf('Administrator-Test') >= 0);
  // }
  // return false;
  // return true; //
  return _user?.userRole === UserRole.Admin;
};
