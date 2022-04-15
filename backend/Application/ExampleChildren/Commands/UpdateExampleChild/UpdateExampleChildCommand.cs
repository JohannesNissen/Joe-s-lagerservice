using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ExampleChildren.Commands.UpdateExampleChild
{
  [TODOAuthorize]
  public class UpdateExampleChildCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }
    public ExampleChildInputDto Child { get; set; }


    public class UpdateExampleChildCommandHandler : IRequestHandler<UpdateExampleChildCommand>
    {
      private readonly IApplicationDbContext _context;

      public UpdateExampleChildCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(UpdateExampleChildCommand request, CancellationToken cancellationToken)
      {
        var exampleChild = await _context.ExampleChildren.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (exampleChild == null)
        {
          throw new NotFoundException(nameof(ExampleChild), request.Id);
        }

        if (!await _context.ExampleParents.AnyAsync(e => e.Id == request.Child.ParentId, cancellationToken))
        {
          throw new NotFoundException(nameof(ExampleParent), request.Child.ParentId);
        }

        exampleChild.Name = request.Child.Name;
        exampleChild.Type = request.Child.Type;
        exampleChild.ParentId = request.Child.ParentId;

        _context.ExampleChildren.Update(exampleChild);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
