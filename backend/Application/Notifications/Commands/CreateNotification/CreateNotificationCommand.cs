using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using MediatR;
using Domain.Enums;
using Domain.Entities;

namespace Application.Notifications.Commands.CreateNotification
{
  public class CreateNotificationCommand : IRequest<int>
  {
    public NotificationTypes NotificationType { get; set; }
    public int UserId { get; set; }

    public class CreateNotificationCommandHandler : IRequestHandler<CreateNotificationCommand, int>
    {
      private readonly IApplicationDbContext _dbcontext;
      private readonly INotificationGenerator _notificationGenerator;
      public CreateNotificationCommandHandler(IApplicationDbContext dbContext, INotificationGenerator notificationGenerator)
      {
        _dbcontext = dbContext;
        _notificationGenerator = notificationGenerator;
      }

      public async Task<int> Handle(CreateNotificationCommand request, CancellationToken cancellationToken)
      {
        var user = await _dbcontext.Users.FindAsync(request.UserId);
        var entity = new Notification
        {
          Sender = user,
        };
        return 0;
      }
    }
  }
}
