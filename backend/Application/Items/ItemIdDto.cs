

using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Items
{
  public class ItemIdDto : IAutoMap<Item>
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int TotalInStock { get; set; }
    public int UsedInOffice { get; set; }
    public int AmountLentOut { get; set; }
    public string Description { get; set; }
    public bool Borrowable { get; set; }
  }
}
