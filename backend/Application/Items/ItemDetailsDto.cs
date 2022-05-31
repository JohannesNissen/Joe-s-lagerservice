using System.Collections.Generic;
using Domain.Entities;

namespace Application.Items
{
  public class ItemDetailsDto : ItemIdDto
  {
    public List<BorrowedItem> BorrowedItems { get; set; }

    public int TotalInStock { get; set; }
    public int UsedInOffice { get; set; }
    public int AmountLentOut { get; set; }
    public Item Item { get; set; }
  }
}
