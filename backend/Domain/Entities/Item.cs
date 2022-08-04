using System.Collections.Generic;
using Domain.Common;


namespace Domain.Entities
{
  public class Item : AuditableEntity
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int TotalInStock { get; set; }
    public int UsedInOffice { get; set; }
    public int AmountLentOut { get; set; }
    public string Description { get; set; }
    public bool Borrowable { get; set; }
    public string FilePath { get; set; }

    // public virtual Image Image { get; set; }
    public virtual ICollection<BorrowedItem> Borrowed { get; set; }

  }
}
