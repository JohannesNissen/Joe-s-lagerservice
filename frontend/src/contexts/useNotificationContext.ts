import { useCallback, useState } from "react";
import { client } from "services/backend/client";
import { NotificationFetchClient, NotificationIdDto } from "services/backend/client.generated";

export interface NotificationContextType {
  notifications: NotificationIdDto[];
  getNotifications: (userId: number) => Promise<void>;
}

const useNotificationContext: () => NotificationContextType = () => {
  const [notifications, dispatchNotfications] = useState<NotificationIdDto[]>([]);

  const getNotifications = useCallback(
    async (userId: number) => {
      const notificationClient = await client(NotificationFetchClient);
      await notificationClient.notification_getAllNotifications(userId).then(response => {
        dispatchNotfications(response);
      });
    },
    [dispatchNotfications]
  );

  return {
    notifications,
    getNotifications
  };
};

export default useNotificationContext;
