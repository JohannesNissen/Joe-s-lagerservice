

namespace Application.Notifications
{
  public class UpdateStatusDto
  {
    public int NotificationId { get; set; }
    public bool status { get; set; }
    public int RecieverId { get; set; }
  }
}
