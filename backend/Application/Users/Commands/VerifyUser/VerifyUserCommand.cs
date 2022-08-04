using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Application.Common.Interfaces;
using Application.Common.Exceptions;
using Application.Common.Security;

namespace Application.Users.Commands.VerifyUser
{
  //[Authorize(Roles = "Administrator")]
  [TODOAuthorize]
  public class VerifyUserCommand : IRequest<LoginUserDto>
  {
    public string Email { get; set; }
    public string Password { get; set; }

    public class VerifyUserCommandHandler : IRequestHandler<VerifyUserCommand, LoginUserDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly IEncryptionService _encryption_service;

      public VerifyUserCommandHandler(IApplicationDbContext context, IEncryptionService encryptionService)
      {
        _context = context;
        _encryption_service = encryptionService;
      }

      public async Task<LoginUserDto> Handle(VerifyUserCommand request, CancellationToken cancellationToken)
      {
        var entity = await _context.Users.FirstOrDefaultAsync(r => r.Email == request.Email, cancellationToken);
        if (entity == null)
        {
          throw new BadRequestException("Account doesn't exist");
        }

        var result = _encryption_service.AreEqual(request.Password, entity.Password);
        if (!result) throw new BadRequestException("Invalid credentials");

        var userDto = new LoginUserDto
        {
          Id = entity.Id,
          Email = entity.Email,
          Name = entity.Name,
          UserRole = entity.UserRole
        };

        return userDto;
      }
    }
  }
}
