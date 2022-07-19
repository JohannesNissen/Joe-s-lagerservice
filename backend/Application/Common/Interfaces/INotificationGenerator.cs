
using Domain.Entities;
using Domain.Enums;

namespace Application.Common.Interfaces
{
  public interface INotificationGenerator
  {
    Notification generateNotification(NotificationTypes notificationType);
    Notification RegainPermissionAnswer(User reciever, bool permissionGranted, NotificationTypes notificationType = NotificationTypes.regainPermissionRequest);
    Notification BorrowItemRequest(User Sender, NotificationTypes notificationType = NotificationTypes.borrowRequest);
  }
}
