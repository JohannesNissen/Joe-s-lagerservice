using System;
using Application.Common.Mappings;
using Domain.Entities;
using Domain.Enums;

namespace Application.Items
{
  public class BorrowedItemIdDto : IAutoMap<BorrowedItem>
  {
    public int Id { get; set; }
    public User User { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime ExpirationDate { get; set; }
    public Item Item { get; set; }
    public int Amount { get; set; }
    public BorrowedStatus Status { get; set; }
  }
}
