using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Application.Items;

namespace Application.Users.Queries.GetUserProfile
{
  [TODOAuthorize]
  public class GetUserProfileQuery : IRequest<UserProfileDto>
  {
    public int UserId { get; set; }
    public class GetUserProfileQueryHandler : IRequestHandler<GetUserProfileQuery, UserProfileDto>
    {
      private readonly IApplicationDbContext _dbContext;
      private readonly IMapper _mapper;
      public GetUserProfileQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
      {
        _dbContext = dbContext;
        _mapper = mapper;
      }

      public async Task<UserProfileDto> Handle(GetUserProfileQuery request, CancellationToken cancellationToken)
      {
        var user = await _dbContext.Users
              .Include(user => user.Lead)
              .Include(user => user.BorrowedItems)
              .FirstOrDefaultAsync(user => user.Id == request.UserId);


        // var user2 = (from u in _dbContext.Users
        //              join bi in _dbContext.BorrowedItems on u.Id equals bi.UserId
        //              join i in _dbContext.Items on bi.ItemId equals i.Id
        //              where u.Id == request.UserId
        //              select new UserProfileDto
        //              {

        //              });


        if (user == null) throw new NotFoundException(nameof(Users), request.UserId);

        var entity = new UserProfileDto
        {
          Id = user.Id,
          Email = user.Email,
          Name = user.Name,
          TeamLead = user.Lead.Email,
          UserRole = user.UserRole,
          BorrowedItems = user.BorrowedItems.Select(item => new BorrowedItemDto
          {
            Amount = item.Amount,
            Id = item.Id,
            StartDate = item.StartDate,
            ExpirationDate = item.ExpirationDate,
            Status = item.Status,
            UserDisplayName = user.Name,
            Item = item.ItemId,
          })
        };

        return entity;
      }
    }
  }
}
