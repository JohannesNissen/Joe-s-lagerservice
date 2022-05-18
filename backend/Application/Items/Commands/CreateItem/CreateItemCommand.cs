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
    public int TotalInStock { get; set; }
    public int AmountLentOut { get; set; }
    public int UsedInOffice { get; set; }

    public class CreateItemCommandHandler : IRequestHandler<CreateItemCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateItemCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateItemCommand request, CancellationToken cancellationToken)
      {
        var entity = await _context.Items.FirstOrDefaultAsync(r => r.Name == request.Name, cancellationToken);
        if (entity != null)
        {
          throw new BadRequestException("Recipient name", request.Name, "Item with the given name already exists.");
        }

        entity = new Item
        {
          Name = request.Name,
          TotalInStock = request.TotalInStock,
          AmountLentOut = request.AmountLentOut,
          UsedInOffice = request.UsedInOffice
        };

        _context.Items.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
      }
    }
  }
}
