using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Application.Common.Security;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Application.Common.Exceptions;
using System.Collections.Generic;

namespace Application.Items.Commands.UploadImage
{
  [TODOAuthorize]
  public class UploadImageCommand : IRequest<List<ImageIdDto>>
  {
    public int ItemId { get; set; }
    public List<IFormFile> ImageFiles { get; set; }

    public class UploadImageCommandHandler : IRequestHandler<UploadImageCommand, List<ImageIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IImageService _imageService;

      public UploadImageCommandHandler(IApplicationDbContext context, IImageService imageService)
      {
        _context = context;
        _imageService = imageService;
      }

      public async Task<List<ImageIdDto>> Handle(UploadImageCommand request, CancellationToken cancellationToken)
      {
        var item = await _context.Items.Include(item => item.Images)
                                                        .FirstOrDefaultAsync(ig => ig.Id == request.ItemId);
        if (item == null)
        {
          throw new NotFoundException(nameof(Items), request.ItemId);
        }

        List<Image> newImages = new List<Image>();
        List<ImageIdDto> newImageDtos = new List<ImageIdDto>();
        string error = null;

        request.ImageFiles.ForEach(async i =>
        {

          string filePath = await _imageService.UploadImageAsync(item.Id, i, cancellationToken);
          if (filePath == null)
          {
            error = $"An unknown error occurred when uploading {i.FileName}.";
            throw new System.Exception($"An unknown error occurred when uploading {i.FileName}.");
          }

          int imageIndex = item.Images.Count > 0 ? item.Images.Max(i => i.Index) + 1 : 1;

          var image = new Image
          {
            ItemId = item.Id,
            Index = imageIndex,
            FilePath = filePath
          };

          // newImages.Add(image);
          item.Images.Add(image);
          newImageDtos.Add(new ImageIdDto(image));
        });

        await _context.SaveChangesAsync(cancellationToken);

        newImageDtos.ForEach(dto =>
        {
          dto.Id = item.Images.FirstOrDefault(img => img.Index == dto.Index).Id;
        });

        return newImageDtos;
      }
    }
  }
}
