using Application.Items.Commands.UploadImage;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{

  public class ImageController : ApiControllerBase
  {

    [HttpPost("{itemId}")]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<string>> UploadImages([FromRoute] int itemId, IFormFile file)
    {
      return await Mediator.Send(new UploadImageCommand
      {
        ItemId = itemId,
        ImageFile = (IFormFile)file
      });
    }
  }
}
