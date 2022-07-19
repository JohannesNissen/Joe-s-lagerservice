using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Notifications.Queries.GetAllNotifications
{
  [TODOAuthorize]
  public class GetAllNotificationsQuery : IRequest<List<NotificationIdDto>>
  {

    public int RecieverId { get; set; }
    public class GetAllNotificationsQueryHandler : IRequestHandler<GetAllNotificationsQuery, List<NotificationIdDto>>
    {
      private readonly IApplicationDbContext _dbContext;
      private readonly IMapper _mapper;
      public GetAllNotificationsQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
      {
        _dbContext = dbContext;
        _mapper = mapper;
      }

      public async Task<List<NotificationIdDto>> Handle(GetAllNotificationsQuery request, CancellationToken cancellationToken)
      {
        var Notifications = await _dbContext.Notifications
          .Where(noti => noti.RecieverId == request.RecieverId)
          .OrderByDescending(i => i.Id)
          .ProjectTo<NotificationIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync();
        return Notifications;
      }
    }
  }
}
