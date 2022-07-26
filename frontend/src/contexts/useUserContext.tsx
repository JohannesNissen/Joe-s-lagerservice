import { useCallback, useState } from "react";
import { client } from "services/backend/client";
import {
  ProfileFetchClient,
  UserFetchClient,
  UserIdDto,
  UserProfileDto,
  VerifyUserCommand
} from "services/backend/client.generated";

export interface UserContextType {
  users: UserIdDto[];
  user: UserProfileDto;
  fetchAllUsers: () => Promise<void>;
  fetchUserProfile: (_userId: number) => Promise<void>;
  signIn: (_email: string, _passcode: string) => Promise<void>;
}

const useUserContext: () => UserContextType = () => {
  const [users, dispatchUsers] = useState<UserIdDto[]>([]);
  const [user, dispatchUser] = useState<UserProfileDto>({});
  const [userId, dispatchUserId] = useState<number>(0);

  const fetchAllUsers = useCallback(async () => {
    const userClient = await client(UserFetchClient);
    const fetchedUsers = await userClient.user_GetAllUsers();
    dispatchUsers(fetchedUsers);
  }, []);

  const fetchUserProfile = useCallback(
    async (_userId: number) => {
      if (_userId === user.id) return;
      const userClient = await client(ProfileFetchClient);
      const fetchAllUser = await userClient.profile_getUserInfo(_userId);
      dispatchUser(fetchAllUser);
    },
    [user]
  );

  const signIn = useCallback(async (_email: string, _passcode: string) => {
    const userClient = await client(UserFetchClient);
    const creds: VerifyUserCommand = {
      email: _email,
      password: _passcode
    };
    await userClient.user_Login(creds);
  }, []);

  return {
    users,
    user,
    fetchAllUsers,
    fetchUserProfile,
    signIn
  };
};

export default useUserContext;
