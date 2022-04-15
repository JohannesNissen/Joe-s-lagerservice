using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ExampleParents.Commands.CreateExampleParent
{
  [TODOAuthorize]
  public class CreateExampleParentCommand : IRequest<int>
  {
    public string Name { get; set; }

    public class CreateExampleParentCommandHandler : IRequestHandler<CreateExampleParentCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateExampleParentCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }
      public async Task<int> Handle(CreateExampleParentCommand request, CancellationToken cancellationToken)
      {

        var parent = new ExampleParent
        {
          Name = request.Name
        };

        _context.ExampleParents.Add(parent);

        await _context.SaveChangesAsync(cancellationToken);

        return parent.Id;
      }
    }
  }
}
