using System;
using Domain.Enums;

namespace Application.Items
{
  public class BorrowedItemDto
  {
    public int Id { get; set; }
    public string UserDisplayName { get; set; }
    public int Item { get; set; }
    public int Amount { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime ExpirationDate { get; set; }
    public BorrowedStatus Status { get; set; }
  }
}
