


using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Application.Common.Security;

namespace Application.Items.Queries.GetAllItems
{
  [TODOAuthorize]
  public class GetAllItemsQuery : IRequest<List<ItemIdDto>>
  {
    public class GetAllItemsQueryHandler : IRequestHandler<GetAllItemsQuery, List<ItemIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetAllItemsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<ItemIdDto>> Handle(GetAllItemsQuery request, CancellationToken cancellationToken)
      {
        var viewModel = await _context.Items
          .OrderByDescending(i => i.Id)
          .ProjectTo<ItemIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync();


        return viewModel;
      }
    }
  }
}
