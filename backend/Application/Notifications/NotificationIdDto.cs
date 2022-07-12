
using Application.Common.Mappings;
using Domain.Entities;
using Domain.Enums;

namespace Application.Notifications
{
  public class NotificationIdDto : IAutoMap<Notification>
  {
    public int Id { get; set; }
    public int SenderId { get; set; }
    public int RecieverId { get; set; }
    public NotificationTypes NotificationType { get; set; }
    public bool Seen { get; set; }
    public string Text { get; set; }
  }
}
