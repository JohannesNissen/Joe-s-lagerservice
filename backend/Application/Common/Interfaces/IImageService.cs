using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Threading;
using MediatR;
using Domain.Enums;

namespace Application.Common.Interfaces
{

  public interface IImageService
  {

    ///<summary>
    /// Uploads an image to an image gallery
    /// and returns a path for the frontend to display the image.
    ///</summary>
    ///<returns>
    /// Path pointing to the storage location of the uploaded image.
    /// This path may be relative to the current website, starting with a frontslash.
    /// Otherwise the path will be a full url.
    ///</returns>
    Task<string> UploadImageAsync(int imageGalleryId, IFormFile imageFile, CancellationToken cancellationToken, ImageType imageType = ImageType.ItemPicture);

    Task<Unit> DeleteImageAsync(string imagePath, CancellationToken cancellationToken);

  }
}
