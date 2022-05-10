using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Items.Commands.EditItem
{
  [TODOAuthorize]
  public class EditItemCommand : IRequest<Unit>
  {
    public int Id { get; set; }
    public EditItemDto EditItemDto { get; set; }
    public class EditItemCommandHandler : IRequestHandler<EditItemCommand, Unit>
    {
      private readonly IApplicationDbContext _context;
      private readonly IImageService _imageService;
      private readonly IMapper _mapper;
      public EditItemCommandHandler(IApplicationDbContext context, IImageService imageService, IMapper mapper)
      {
        _context = context;
        _imageService = imageService;
        _mapper = mapper;
      }

      public async Task<Unit> Handle(EditItemCommand request, CancellationToken cancellationToken)
      {
        var item = await _context.Items.Include(ig => ig.Images)
                                                        .FirstOrDefaultAsync(ig => ig.Id == request.Id);
        if (item == null)
        {
          throw new NotFoundException(nameof(Items), request.Id);
        }

        var editDto = request.EditItemDto;

        if (editDto.Images != null)
        {
          foreach (var imageDto in editDto.Images)
          {
            var image = item.Images.FirstOrDefault(i => i.Id == imageDto.Id);
            if (image == null)
              continue;

            image.Index = imageDto.Index;
          }
        }

        if (editDto.ImagesToDelete != null)
        {
          foreach (int id in editDto.ImagesToDelete)
          {
            var image = item.Images.FirstOrDefault(i => i.Id == id);
            if (image == null)
            {
              continue;
            }
            await _imageService.DeleteImageAsync(image.FilePath, cancellationToken);
            item.Images.Remove(image);
          }
        }

        item.AmountLentOut = editDto.AmountLentOut;
        item.Name = editDto.Name;
        item.TotalInStock = editDto.TotalInStock;
        item.UsedInOffice = editDto.UsedInOffice;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
