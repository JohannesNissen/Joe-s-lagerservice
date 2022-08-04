import useLocalStorage from "hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { client } from "services/backend/client";
import {
  LoginUserDto,
  ProfileFetchClient,
  UserFetchClient,
  UserIdDto,
  UserProfileDto,
  VerifyUserCommand
} from "services/backend/client.generated";

export interface UserContextType {
  users: UserIdDto[];
  user: LoginUserDto;
  userProfile: UserProfileDto;
  fetchAllUsers: () => Promise<void>;
  fetchUserProfile: (_userId: number) => Promise<void>;
  signIn: (_email: string, _passcode: string) => Promise<void>;
  resetUser: () => void;
}

const useUserContext: () => UserContextType = () => {
  const [users, dispatchUsers] = useState<UserIdDto[]>([]);
  const [userProfile, dispatchUserProfile] = useState<UserProfileDto>({});
  const [user, dispatchUser] = useLocalStorage<LoginUserDto>("user", null);
  const [userId, dispatchUserId] = useState<number>(0);

  const router = useRouter();

  const [value, setValue] = useLocalStorage<LoginUserDto>("user", {});

  const fetchAllUsers = useCallback(async () => {
    const userClient = await client(UserFetchClient);
    const fetchedUsers = await userClient.user_GetAllUsers();
    dispatchUsers(fetchedUsers);
  }, []);

  const fetchUserProfile = useCallback(
    async (_userId: number) => {
      if (!user) return;
      if (_userId === userProfile?.id) return;
      const userClient = await client(ProfileFetchClient);
      const fetchAllUser = await userClient.profile_getUserInfo(_userId);
      dispatchUserProfile(fetchAllUser);
    },
    [user, userProfile?.id]
  );

  const signIn = useCallback(
    async (_email: string, _passcode: string) => {
      const userClient = await client(UserFetchClient);
      const creds: VerifyUserCommand = {
        email: _email,
        password: _passcode
      };
      const result = await userClient.user_Login(creds);
      if (result.id) {
        dispatchUser(result);
        router.push("/gallery");
      }
    },
    [dispatchUser, router]
  );

  const resetUser = useCallback(() => {
    dispatchUserProfile(null);
    dispatchUser(null);
    dispatchUsers([]);
    dispatchUserId(0);
  }, [dispatchUser]);

  return {
    resetUser,
    users,
    user,
    userProfile,
    fetchAllUsers,
    fetchUserProfile,
    signIn
  };
};

export default useUserContext;
