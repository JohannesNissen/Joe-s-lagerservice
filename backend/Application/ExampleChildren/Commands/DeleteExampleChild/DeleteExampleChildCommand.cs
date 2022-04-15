using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ExampleChildren.Commands.DeleteExampleChild
{
  [TODOAuthorize]
  public class DeleteExampleChildCommand : IRequest
  {
    public int Id { get; set; }

    public class DeleteExampleChildCommandHandler : IRequestHandler<DeleteExampleChildCommand>
    {
      private readonly IApplicationDbContext _context;

      public DeleteExampleChildCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }
      public async Task<Unit> Handle(DeleteExampleChildCommand request, CancellationToken cancellationToken)
      {
        var exampleChild = await _context.ExampleChildren.FirstOrDefaultAsync(x => x.Id == request.Id);

        if (exampleChild == null)
        {
          throw new NotFoundException(nameof(ExampleChild), request.Id);
        }

        _context.ExampleChildren.Remove(exampleChild);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
