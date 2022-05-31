using Application.Items;
using Application.Items.Commands.CreateItem;
using Application.Items.Commands.EditItem;
using Application.Items.Commands.UploadImage;
using Application.Items.Queries.GetAllItems;
using Application.Items.Queries.GetItemDetails;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class ItemController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> CreateItem([FromBody] CreateItemCommand command, CancellationToken cancellationToken)
    {
      return await Mediator.Send(command, cancellationToken);
    }

    [HttpPost("{itemId}")]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<List<ImageIdDto>>> UploadImages([FromRoute] int itemId, ICollection<IFormFile> files)
    {
      return await Mediator.Send(new UploadImageCommand
      {
        ItemId = itemId,
        ImageFiles = (List<IFormFile>)files
      });
    }

    [HttpPut("{itemId}")]
    public async Task<ActionResult> EditItem([FromRoute] int itemId, [FromBody] EditItemDto editItemDto, CancellationToken cancellationToken)
    {
      await Mediator.Send(new EditItemCommand
      {
        Id = itemId,
        EditItemDto = editItemDto
      }, cancellationToken);

      return NoContent();
    }

    [HttpGet]
    public async Task<ActionResult<List<ItemIdDto>>> GetAllItems(CancellationToken cancellationToken)
    {
      return await Mediator.Send(new GetAllItemsQuery(), cancellationToken);
    }

    [HttpGet("{itemId}")]
    public async Task<ActionResult<ItemDetailsDto>> GetItemDetails([FromRoute] int itemId, CancellationToken cancellationToken)
    {
      return await Mediator.Send(new GetItemDetailsQuery { Id = itemId }, cancellationToken);
    }
  }
}
