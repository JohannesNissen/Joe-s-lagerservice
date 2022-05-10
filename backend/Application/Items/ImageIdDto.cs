using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Items
{
  public class ImageIdDto : IAutoMap<Image>
  {
    public int Id { get; set; }
    public int ImageGalleryId { get; set; }
    public int Index { get; set; }
    public string FilePath { get; set; }

    public ImageIdDto() { }

    public ImageIdDto(Image image)
    {
      Id = image.Id;
      ImageGalleryId = image.ItemId;
      Index = image.Index;
      FilePath = image.FilePath;
    }

  }
}
