
using Domain.Entities;
using Domain.Enums;

namespace Application.Common.Interfaces
{
  public interface INotificationGenerator
  {
    Notification generateNotification(NotificationTypes notificationType);
  }
}
