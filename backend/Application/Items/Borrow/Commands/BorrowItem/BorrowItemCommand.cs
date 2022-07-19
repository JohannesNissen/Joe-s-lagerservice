using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Items.Commands.BorrowItem
{
  [TODOAuthorize]
  public class BorrowItemCommand : IRequest<int>
  {
    public int UserId { get; set; }
    public int ItemId { get; set; }
    public int amount { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }



    public class BorrowItemCommandHandler : IRequestHandler<BorrowItemCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public BorrowItemCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(BorrowItemCommand request, CancellationToken cancellationToken)
      {
        var item = await _context.Items.FirstOrDefaultAsync(item => item.Id == request.ItemId);
        var user = await _context.Users.Include(user => user.Lead).FirstOrDefaultAsync(user => user.Id == request.UserId);

        var entity = new BorrowedItem
        {
          Amount = request.amount,
          Item = item,
          User = user,
          Status = BorrowedStatus.Requested,
          StartDate = request.StartDate,
          ExpirationDate = request.EndDate
        };

        _context.BorrowedItems.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        var notification = new Notification
        {
          Seen = false,
          Text = $"{user.Name} would like to borrow an item",
          SenderId = user.Id,
          RecieverId = user.Lead.Id,
          NotificationType = NotificationTypes.borrowRequest,
          ContentId = entity.Id
        };

        _context.Notifications.Add(notification);
        await _context.SaveChangesAsync(cancellationToken);
        return entity.Id;
      }
    }
  }
}
