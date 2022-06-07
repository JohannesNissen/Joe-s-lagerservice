using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Application.Common.Interfaces;
using Application.Common.Exceptions;
using Application.Common.Security;

namespace Application.Items.Commands.CreateItem
{
  //[Authorize(Roles = "Administrator")]
  [TODOAuthorize]
  public class CreateItemCommand : IRequest<int>
  {

    public string Name { get; set; }
    public int AmountBought { get; set; }
    public int ReserveForOffice { get; set; }
    public string Description { get; set; }
    public bool Borrowable { get; set; }

    public class CreateItemCommandHandler : IRequestHandler<CreateItemCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateItemCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateItemCommand request, CancellationToken cancellationToken)
      {
        var entity = await _context.Items.FirstOrDefaultAsync(item => item.Name == request.Name, cancellationToken);
        if (entity != null)
        {
          throw new BadRequestException("Item name", request.Name, "An item with the given name already exists.");
        }

        entity = new Item
        {
          Name = request.Name,
          TotalInStock = request.AmountBought,
          AmountLentOut = 0,
          UsedInOffice = request.ReserveForOffice,
          Borrowable = request.Borrowable,
          Description = request.Description
        };

        _context.Items.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
      }
    }
  }
}
