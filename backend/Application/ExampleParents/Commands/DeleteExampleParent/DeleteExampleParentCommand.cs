using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

[TODOAuthorize]

public class DeleteExampleParent : IRequest<Unit>
{
  public int Id { get; set; }

  public class DeleteExampleParentHandler : IRequestHandler<DeleteExampleParent, Unit>
  {
    private readonly IApplicationDbContext _applicationDbContext;

    public DeleteExampleParentHandler(IApplicationDbContext applicationDbContext)
    {
      _applicationDbContext = applicationDbContext;
    }

    public async Task<Unit> Handle(DeleteExampleParent request, CancellationToken cancellationToken)
    {
      var exampleParent = await _applicationDbContext.ExampleParents.Include(x => x.Children)
        .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

      if (exampleParent == null)
        throw new NotFoundException(nameof(ExampleParent), request.Id);

      if (exampleParent.Children.Any())
        throw new CommandErrorCodeException(CommandErrorCode.ExampleParentCustomErrorCode, null, "Cannot delete parent with related children.");

      _applicationDbContext.ExampleParents.Remove(exampleParent);

      await _applicationDbContext.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}
