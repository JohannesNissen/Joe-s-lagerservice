using System;
using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class BorrowedItem : AuditableEntity
  {
    public int Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime ExpirationDate { get; set; }
    public int Amount { get; set; }
    public BorrowedStatus Status { get; set; }
    public int UserId { get; set; }
    public int ItemId { get; set; }
    public virtual User User { get; set; }
    public virtual Item Item { get; set; }
  }
}
