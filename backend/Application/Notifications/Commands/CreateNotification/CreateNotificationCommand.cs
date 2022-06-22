using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using MediatR;
using Domain.Enums;
using Application.Common.Security;
using Microsoft.EntityFrameworkCore;

namespace Application.Notifications.Commands.CreateNotification
{
  [TODOAuthorize]
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
        var user = await _dbcontext.Users.Include(user => user.Lead).FirstOrDefaultAsync(user => user.Id == request.UserId);
        var entity = _notificationGenerator.RegainPermissionAnswer(user, true);
        _dbcontext.Notifications.Add(entity);
        await _dbcontext.SaveChangesAsync(cancellationToken);
        return entity.Id;
      }
    }
  }
}
