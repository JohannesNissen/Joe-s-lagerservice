using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Application.Common.SignalR.Hubs;
using Application.Common.SignalR.Interfaces.HubContexts;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ExampleChildren.Commands.CreateExampleChild
{
  [TODOAuthorize]
  public class CreateExampleChildCommand : IRequest<int>
  {
    public ExampleChildInputDto Child { get; set; }

    public class CreateExampleChildCommandHandler : IRequestHandler<CreateExampleChildCommand, int>
    {
      private readonly IApplicationDbContext _context;
      private readonly IHubContext<ExampleHub, IExampleHubService> _exampleHubContext;

      public CreateExampleChildCommandHandler(IApplicationDbContext context, IHubContext<ExampleHub, IExampleHubService> exampleHubContext)
      {
        _context = context;
        _exampleHubContext = exampleHubContext;
      }

      public async Task<int> Handle(CreateExampleChildCommand request, CancellationToken cancellationToken)
      {

        var parentExists = await _context.ExampleParents.AnyAsync(x => x.Id == request.Child.ParentId);

        if (!parentExists)
          throw new NotFoundException(nameof(ExampleParent), request.Child.ParentId);

        var exampleChild = new ExampleChild
        {
          Name = request.Child.Name,
          Type = request.Child.Type,
          ParentId = request.Child.ParentId,
        };

        _context.ExampleChildren.Add(exampleChild);

        await _context.SaveChangesAsync(cancellationToken);

        await _exampleHubContext.Clients.All.ReceiveMessage("New Child has been added!");

        return exampleChild.Id;
      }
    }
  }
}
