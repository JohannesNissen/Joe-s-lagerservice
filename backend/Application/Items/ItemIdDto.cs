

using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Items
{
  public class ItemIdDto : IAutoMap<Item>
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int AmountAvailable { get; set; }
  }
}
