using Application.Notifications;
using Application.Notifications.Commands.CreateNotification;
using Application.Notifications.Queries.GetAllNotifications;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Web.Controllers
{
  public class NotificationController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> CreateNotification([FromBody] CreateNotificationCommand request, CancellationToken cancellationToken)
    {
      return await Mediator.Send(request, cancellationToken);
    }

    [HttpGet("userId")]
    public async Task<ActionResult<List<NotificationIdDto>>> getAllNotifications([FromRoute] int userId, CancellationToken cancellationToken)
    {
      return await Mediator.Send(new GetAllNotificationsQuery(), cancellationToken);
    }
  }
}
