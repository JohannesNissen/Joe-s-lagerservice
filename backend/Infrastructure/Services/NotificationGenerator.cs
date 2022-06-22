using Domain.Enums;
using Domain.Entities;
using System;
using Application.Common.Interfaces;

namespace Infrastructure.Services
{
  public class NotificationGenerator : INotificationGenerator
  {
    public Notification BorrowItemRequest(User Sender, NotificationTypes notificationType = NotificationTypes.borrowRequest)
    {
      var text = $"{Sender.Name} would like to borrow an item";
      return new Notification
      {
        SenderId = Sender.Id,
        RecieverId = Sender.Lead.Id,
        Text = text,
        Seen = false,
        NotificationType = notificationType
      };
    }

    public Notification BorrowItemAnswer(User reciever, string answer, NotificationTypes notificationType = NotificationTypes.borrowAnswer)
    {
      var text = $"Your request has been {answer}";
      return new Notification
      {
        SenderId = reciever.Lead.Id,
        RecieverId = reciever.Id,
        Text = text,
        Seen = false,
        NotificationType = notificationType
      };
    }

    public Notification RevokePermission(User reciever, NotificationTypes notificationType = NotificationTypes.revokePermission)
    {
      var text = $"You can no longer request to borrow anything from company's storage";
      return new Notification
      {
        SenderId = reciever.Lead.Id,
        RecieverId = reciever.Id,
        Text = text,
        Seen = false,
        NotificationType = notificationType
      };
    }

    public Notification RegainPermissionRequest(User sender, NotificationTypes notificationType = NotificationTypes.regainPermissionRequest)
    {
      var text = $"{sender.Name} would like to be able to borrow from company's storage again";
      return new Notification
      {
        SenderId = sender.Id,
        RecieverId = sender.Lead.Id,
        Text = text,
        Seen = false,
        NotificationType = notificationType
      };
    }

    public Notification RegainPermissionAnswer(User reciever, bool permissionGranted, NotificationTypes notificationType = NotificationTypes.regainPermissionAnswer)
    {
      var text = $"Your request to borrow be able to borrow again has been {(permissionGranted ? "granted" : "denied")}";
      return new Notification
      {
        SenderId = reciever.Lead.Id,
        RecieverId = reciever.Id,
        Text = text,
        Seen = false,
        NotificationType = notificationType
      };
    }

    public Notification generateNotification(NotificationTypes notificationType)
    {
      throw new NotImplementedException();
    }
  }
}
