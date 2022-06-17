using Domain.Enums;
using Domain.Common;

namespace Domain.Entities
{
  public class Notification : AuditableEntity
  {
    public int Id { get; set; }
    public User Sender { get; set; }
    public User Reciever { get; set; }
    public NotificationTypes NotificationType { get; set; }
    public bool Seen { get; set; }
    public string Text { get; set; }


  }
}
