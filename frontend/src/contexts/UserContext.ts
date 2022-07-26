import { createContext } from "react";

import useUserContext from "./useUserContext";

type UserContextType = ReturnType<typeof useUserContext>;

export const UserContext = createContext<UserContextType>({
  users: [],
  user: {},
  fetchAllUsers: async () => {
    return;
  },
  fetchUserProfile: async _userId => {
    return;
  },
  signIn: async (_email: string, _passcode: string) => {
    return;
  }
});
