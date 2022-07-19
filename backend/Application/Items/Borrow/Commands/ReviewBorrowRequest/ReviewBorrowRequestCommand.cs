using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Items.Commands.ReviewBorrowRequest
{
  [TODOAuthorize]
  public class ReviewBorrowRequestCommand : IRequest<Unit>
  {
    public int BorrowedItemId { get; set; }
    public int ReviewerId { get; set; }
    public int Amount { get; set; }
    public DateTime StartDate { get; set; } = DateTime.MinValue;
    public DateTime EndDate { get; set; } = DateTime.MinValue;
    public BorrowedStatus Status { get; set; }
    public class ReviewBorrowRequestCommandHandler : IRequestHandler<ReviewBorrowRequestCommand, Unit>
    {
      private readonly IApplicationDbContext _context;
      public ReviewBorrowRequestCommandHandler(IApplicationDbContext dbContext)
      {
        _context = dbContext;
      }

      public async Task<Unit> Handle(ReviewBorrowRequestCommand request, CancellationToken cancellationToken)
      {
        var BorrowedItem = await _context.BorrowedItems.Include(BorrowedItem => BorrowedItem.User)
          .FirstOrDefaultAsync(BorrowedItem => BorrowedItem.Id == request.BorrowedItemId);

        BorrowedItem.Status = request.Status;
        if (request.Amount > 0) BorrowedItem.Amount = request.Amount;
        if (request.StartDate > DateTime.MinValue) BorrowedItem.StartDate = request.StartDate;
        if (request.EndDate > DateTime.MinValue) BorrowedItem.ExpirationDate = request.EndDate;

        var notification = new Notification
        {
          Seen = false,
          NotificationType = NotificationTypes.borrowAnswer,
          RecieverId = BorrowedItem.User.Id,
          SenderId = BorrowedItem.User.Lead.Id,
          Text = request.Status == BorrowedStatus.Accepted ? $"You can borrow requested item(s) from {request.StartDate} to {request.EndDate}" : "Your request was denied",
        };

        _context.Notifications.Add(notification);

        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
      }
    }
  }
}
