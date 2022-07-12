import { useCallback, useState } from "react";
import { client } from "services/backend/client";
import {
  NotificationFetchClient,
  NotificationIdDto,
  UpdateStatusDto
} from "services/backend/client.generated";

export interface NotificationContextType {
  notifications: NotificationIdDto[];
  getNotifications: (userId: number) => Promise<void>;
  updateNotificationStatus: (
    userId: number,
    notificationId: number,
    status: boolean
  ) => Promise<void>;
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

  const updateNotificationStatus = useCallback(
    async (userId: number, notificationId: number, status: boolean) => {
      const notificationClient = await client(NotificationFetchClient);
      const dto: UpdateStatusDto = {
        notificationId: notificationId,
        recieverId: userId,
        status: status
      };
      await notificationClient.notification_UpdateStatus(notificationId, dto);
    },
    []
  );

  return {
    notifications,
    getNotifications,
    updateNotificationStatus
  };
};

export default useNotificationContext;
