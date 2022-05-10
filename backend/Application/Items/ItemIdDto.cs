

using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Items
{
  public class ItemIdDto : IAutoMap<Item>
  {
    public string Name { get; set; }
    public int TotalInStock { get; set; }
    public int UsedInOffice { get; set; }
    public int AmountLentOut { get; set; }
  }
}
