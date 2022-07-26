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
  public class VerifyUserCommand : IRequest<bool>
  {
    public string Email { get; set; }
    public string Password { get; set; }

    public class VerifyUserCommandHandler : IRequestHandler<VerifyUserCommand, bool>
    {
      private readonly IApplicationDbContext _context;
      private readonly IEncryptionService _encryption_service;

      public VerifyUserCommandHandler(IApplicationDbContext context, IEncryptionService encryptionService)
      {
        _context = context;
        _encryption_service = encryptionService;
      }

      public async Task<bool> Handle(VerifyUserCommand request, CancellationToken cancellationToken)
      {
        var entity = await _context.Users.FirstOrDefaultAsync(r => r.Email == request.Email, cancellationToken);
        if (entity == null)
        {
          throw new BadRequestException("Account doesn't exist");
        }

        var result = _encryption_service.AreEqual(request.Password, entity.Password);
        if (!result) throw new BadRequestException("Invalid credentials");

        return result;
      }
    }
  }
}
