using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Domain.Enums;
using Application.Common.Interfaces;
using Application.Common.Exceptions;
using Application.Common.Security;
using System.Collections.Generic;

namespace Application.Users.Commands.CreateUser
{
  //[Authorize(Roles = "Administrator")]
  [TODOAuthorize]
  public class CreateUserCommand : IRequest<int>
  {
    public string Email { get; set; }
    public string Password { get; set; }
    public int LeadId { get; set; }
    public UserRole UserRole { get; set; }

    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
    {
      private readonly IApplicationDbContext _context;
      private readonly IEncryptionService _encryption_service;

      public CreateUserCommandHandler(IApplicationDbContext context, IEncryptionService encryptionService)
      {
        _context = context;
        _encryption_service = encryptionService;
      }

      public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
      {
        var entity = await _context.Users.FirstOrDefaultAsync(r => r.Email == request.Email, cancellationToken);
        if (entity != null)
        {
          throw new BadRequestException("Recipient email", request.Email, "Recipient with the given name already exists.");
        }

        entity = new User
        {
          Email = request.Email,
          Password = _encryption_service.EncryptToAES(request.Password),
          UserRole = request.UserRole,
          Lead = await _context.Users.FirstOrDefaultAsync(user => user.Id == request.LeadId),
          ItemsLent = new List<BorrowedItem>()
        };

        _context.Users.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
      }
    }
  }
}
