using Application.Notifications;
using Application.Notifications.Commands.CreateNotification;
using Application.Notifications.Commands.UpdateStatus;
using Application.Notifications.Queries.GetAllNotifications;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class NotificationController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> CreateNotification([FromBody] CreateNotificationCommand request, CancellationToken cancellationToken)
    {
      return await Mediator.Send(request, cancellationToken);
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<List<NotificationIdDto>>> getAllNotifications([FromRoute] int userId, CancellationToken cancellationToken)
    {
      return await Mediator.Send(new GetAllNotificationsQuery { RecieverId = userId }, cancellationToken);
    }

    [HttpPut("notificationId")]
    public async Task<ActionResult> UpdateStatus([FromRoute] int notificationId, [FromBody] UpdateStatusDto statusDto, CancellationToken cancellationToken)
    {
      var dto = new UpdateStatusCommand
      {
        RecieverId = statusDto.RecieverId,
        NotificationId = statusDto.NotificationId,
        status = statusDto.status
      };
      await Mediator.Send(dto, cancellationToken);

      return NoContent();
    }
  }
}
