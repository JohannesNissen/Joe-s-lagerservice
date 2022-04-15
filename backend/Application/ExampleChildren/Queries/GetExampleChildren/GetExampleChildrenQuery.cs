using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ExampleChildren.Queries.GetExampleChildren
{
  [TODOAuthorize]
  public class GetExampleChildrenQuery : IRequest<List<BaseExampleChildQueryDto>>
  {
    public class GetExampleChildrenQueryHandler : IRequestHandler<GetExampleChildrenQuery, List<BaseExampleChildQueryDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetExampleChildrenQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<BaseExampleChildQueryDto>> Handle(GetExampleChildrenQuery request, CancellationToken cancellationToken)
      {
        var viewModel = await _context.ExampleChildren
                .ProjectTo<BaseExampleChildQueryDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);


        return viewModel;
      }
    }
  }
}
