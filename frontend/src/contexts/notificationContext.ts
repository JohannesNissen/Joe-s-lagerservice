import { createContext } from "react";

import useNotificationContext from "./useNotificationContext";

type NotificationContextType = ReturnType<typeof useNotificationContext>;
export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  getNotifications: async (_userId: number) => {
    return;
  },
  updateNotificationStatus: async (userId, notificationId, status) => {
    return;
  }
});
