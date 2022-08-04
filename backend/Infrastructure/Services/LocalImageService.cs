using Application.Common.Interfaces;
using Domain.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Application.Common.Options;
using System.Threading.Tasks;
using System.Threading;
using System.IO;
using MediatR;
using Application.Common.Exceptions;

namespace Infrastructure.Services
{
  public class LocalImageService : IImageService
  {

    private readonly ImageOptions _options;

    public LocalImageService(IOptions<ImageOptions> options)
    {
      _options = options.Value;
    }

    public async Task<string> UploadImageAsync(int imageGalleryId, IFormFile imageFile, CancellationToken cancellationToken, ImageType imageType = ImageType.ItemPicture)
    {
      string storageFolderPath;
      switch (imageType)
      {
        case ImageType.ProfilePicture: storageFolderPath = Path.Combine(_options.ProfileImagePath); break;
        case ImageType.ItemPicture: storageFolderPath = Path.Combine(_options.LocalStorageDirectoryPath); break;
        default: throw new BadRequestException();
      }
      Directory.CreateDirectory(storageFolderPath);

      int imageNameIndex = 1;
      string filePath;
      do
      {
        filePath = Path.Combine(storageFolderPath, $"{imageNameIndex++}{Path.GetExtension(imageFile.FileName)}");
      }
      while (File.Exists(filePath));

      using (Stream fileStream = new FileStream(filePath, FileMode.Create))
      {
        await imageFile.CopyToAsync(fileStream, cancellationToken);
      }

      string externalImagePath = filePath.Replace("\\", "/");
      if (externalImagePath.StartsWith("./wwwroot/"))
        externalImagePath = externalImagePath.Substring(9);
      if (externalImagePath.StartsWith("./"))
        externalImagePath = externalImagePath.Substring(1);

      return externalImagePath;
    }

    public Task<Unit> DeleteImageAsync(string imagePath, CancellationToken cancellationToken)
    {
      string fullImagePath = $"./wwwroot{imagePath}";

      if (File.Exists(fullImagePath))
      {
        File.Delete(fullImagePath);
      }

      return Task.FromResult(Unit.Value);
    }

  }
}
