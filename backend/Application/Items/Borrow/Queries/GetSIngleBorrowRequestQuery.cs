using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Exceptions;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Application.Common.Security;

namespace Application.Items.Queries.GetSingleBorrowRequest
{

  [AllowAnonymous]
  public class GetSingleBorrowRequestQuery : IRequest<BorrowedItemDto>
  {
    public int RequestId { get; set; }

    public class GetSingleBorrowRequestQueryHandler : IRequestHandler<GetSingleBorrowRequestQuery, BorrowedItemDto>
    {
      private readonly IApplicationDbContext _dbContext;
      private readonly IMapper _mapper;
      public GetSingleBorrowRequestQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
      {
        _dbContext = dbContext;
        _mapper = mapper;
      }

      public async Task<BorrowedItemDto> Handle(GetSingleBorrowRequestQuery request, CancellationToken cancellationToken)
      {
        var entity = await _dbContext.BorrowedItems.Include(borrowItem => borrowItem.Item).Include(borrowItem => borrowItem.User).FirstOrDefaultAsync(item => item.Id == request.RequestId);
        if (entity == null) throw new NotFoundException(nameof(Items), request.RequestId);
        var dataObject = new BorrowedItemDto
        {
          Id = request.RequestId,
          Item = entity.Item.Id,
          Amount = entity.Amount,
          UserDisplayName = entity.User.Email,
          StartDate = entity.StartDate,
          ExpirationDate = entity.ExpirationDate,
          Status = entity.Status
        };
        return dataObject;
      }
    }
  }
}
