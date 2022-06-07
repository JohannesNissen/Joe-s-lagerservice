using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Items.Queries.GetItemDetails
{
  [TODOAuthorize]
  public class GetItemDetailsQuery : IRequest<ItemDetailsDto>
  {

    public int Id { get; set; }
    public class GetItemDetailsQueryHandler : IRequestHandler<GetItemDetailsQuery, ItemDetailsDto>
    {
      public readonly IApplicationDbContext _context;
      public GetItemDetailsQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
      {
        _context = dbContext;
      }

      public async Task<ItemDetailsDto> Handle(GetItemDetailsQuery request, CancellationToken cancellationToken)
      {
        var item = await _context.Items.Include(it => it.Borrowed).FirstOrDefaultAsync(item => item.Id == request.Id, cancellationToken);
        var itemDto = new ItemDetailsDto
        {
          Name = item.Name,
          BorrowedItems = new List<BorrowedItem>(item.Borrowed),
          AmountAvailable = item.TotalInStock - item.AmountLentOut - item.UsedInOffice,
          TotalInStock = item.TotalInStock,
          AmountLentOut = item.AmountLentOut,
          UsedInOffice = item.UsedInOffice,
        };
        return itemDto;
      }
    }
  }
}
