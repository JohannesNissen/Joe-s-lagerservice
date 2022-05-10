using System.Collections.Generic;

namespace Application.Items
{
  public class EditItemDto
  {
    public string Name { get; set; }
    public int TotalInStock { get; set; }
    public int UsedInOffice { get; set; }
    public int AmountLentOut { get; set; }
    public IEnumerable<ImageIdDto> Images { get; set; }
    public IEnumerable<int> ImagesToDelete { get; set; }
  }
}
