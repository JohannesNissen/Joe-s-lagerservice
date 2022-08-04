using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Application.Common.Security;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Application.Common.Exceptions;
using System.Collections.Generic;

namespace Application.Items.Commands.UploadImage
{
  [TODOAuthorize]
  public class UploadImageCommand : IRequest<string>
  {
    public int ItemId { get; set; }
    public IFormFile ImageFile { get; set; }

    public class UploadImageCommandHandler : IRequestHandler<UploadImageCommand, string>
    {
      private readonly IApplicationDbContext _context;
      private readonly IImageService _imageService;

      public UploadImageCommandHandler(IApplicationDbContext context, IImageService imageService)
      {
        _context = context;
        _imageService = imageService;
      }

      public async Task<string> Handle(UploadImageCommand request, CancellationToken cancellationToken)
      {
        var item = await _context.Items.FirstOrDefaultAsync(ig => ig.Id == request.ItemId);
        if (item == null)
        {
          throw new NotFoundException(nameof(Items), request.ItemId);
        }

        List<Image> newImages = new List<Image>();
        List<ImageIdDto> newImageDtos = new List<ImageIdDto>();
        string error = null;

        string filePath = await _imageService.UploadImageAsync(item.Id, request.ImageFile, cancellationToken, Domain.Enums.ImageType.ItemPicture);
        if (filePath == null)
        {
          error = $"An unknown error occurred when uploading {request.ImageFile.FileName}.";
          throw new System.Exception($"An unknown error occurred when uploading {request.ImageFile.FileName}.");
        }

        // int imageIndex = item.Images.Count > 0 ? item.Images.Max(i => i.Index) + 1 : 1;

        var image = new Image
        {
          Index = 0,
          ItemId = item.Id,
          FilePath = filePath
        };
        if (item.FilePath != null) await _imageService.DeleteImageAsync(item.FilePath, cancellationToken);
        item.FilePath = filePath;
        // request.ImageFiles.ForEach(async i =>
        // {


        //   // newImages.Add(image);
        //   item.Images.Add(image);
        //   newImageDtos.Add(new ImageIdDto(image));
        // });

        await _context.SaveChangesAsync(cancellationToken);

        // newImageDtos.ForEach(dto =>
        // {
        //   dto.Id = item.Images.FirstOrDefault(img => img.Index == dto.Index).Id;
        // });

        return filePath;
      }
    }
  }
}
