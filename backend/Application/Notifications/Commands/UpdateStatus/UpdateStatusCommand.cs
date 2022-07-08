using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Application.Common.Interfaces;
using Application.Common.Exceptions;
using Application.Common.Security;

namespace Application.Notifications.Commands.UpdateStatus
{
  [TODOAuthorize]
  public class UpdateStatusCommand : IRequest<Unit>
  {
    public int NotificationId { get; set; }
    public bool status { get; set; }
    public int RecieverId { get; set; }
    public class UpdateStatusCommandHandler : IRequestHandler<UpdateStatusCommand, Unit>
    {
      private readonly IApplicationDbContext _dbContext;
      public UpdateStatusCommandHandler(IApplicationDbContext dbContext)
      {
        _dbContext = dbContext;
      }

      public async Task<Unit> Handle(UpdateStatusCommand request, CancellationToken cancellationToken)
      {
        var notification = await _dbContext.Notifications.FirstOrDefaultAsync(noti => noti.Id == request.NotificationId);

        if (notification == null) throw new NotFoundException(nameof(Notifications), request.NotificationId);
        if (notification.RecieverId != request.RecieverId) throw new BadRequestException("You can only update your own notifications");

        notification.Seen = request.status;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return Unit.Value;
      }
    }
  }
}
