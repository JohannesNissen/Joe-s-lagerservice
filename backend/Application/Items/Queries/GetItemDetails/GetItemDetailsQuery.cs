using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
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
        var item = await _context.Items.FirstOrDefaultAsync(item => item.Id == request.Id, cancellationToken);


        var itemDto = new ItemDetailsDto
        {
          ImagePath = item?.FilePath,
          Name = item.Name,
          Borrowable = item.Borrowable,
          AmountAvailable = item.TotalInStock - item.AmountLentOut - item.UsedInOffice,
          TotalInStock = item.TotalInStock,
          AmountLentOut = item.AmountLentOut,
          UsedInOffice = item.UsedInOffice,
          Description = item.Description,
        };
        return itemDto;
      }
    }
  }
}
