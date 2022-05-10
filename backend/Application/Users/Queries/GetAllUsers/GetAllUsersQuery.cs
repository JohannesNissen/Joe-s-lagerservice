

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

namespace Application.Users.Queries.GetAllUsers
{
  [TODOAuthorize]
  public class GetAllUsersQuery : IRequest<List<UserIdDto>>
  {
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, List<UserIdDto>>
    {
      public IApplicationDbContext _context { get; set; }
      public IMapper _mapper { get; set; }
      public GetAllUsersQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
      {
        _context = dbContext;
        _mapper = mapper;
      }

      public async Task<List<UserIdDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
      {
        var users = await _context.Users
          .OrderByDescending(i => i.Id)
          .ProjectTo<UserIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync();
        return users;
      }
    }
  }
}
