using System.Collections.Generic;
using Application.Items;

namespace Application.Users
{
  public class UserProfileDto : UserIdDto
  {
    public string TeamLead { get; set; }
    public IEnumerable<BorrowedItemDto> BorrowedItems { get; set; }
  }
}
