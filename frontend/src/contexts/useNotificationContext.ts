import { useState } from "react";
import { CreateNotificationCommand } from "services/backend/client.generated";

export interface NotificationContextType {
  notifications: CreateNotificationCommand[];
}

const useNotificationContext: () => NotificationContextType = () => {
  const [notifications, dispatchNotfications] = useState<CreateNotificationCommand[]>([]);

  return {
    notifications
  };
};

export default useNotificationContext;
