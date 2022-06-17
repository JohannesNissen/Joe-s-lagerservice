using System.Collections.Generic;
using System.Text.Json.Serialization;
using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class User : AuditableEntity
  {
    public int Id { get; set; }
    public string Name { get; set; }

    public string Email { get; set; }
    public User Lead { get; set; }

    [JsonIgnore]
    public string Password { get; set; }
    public UserRole UserRole { get; set; }

    public virtual ICollection<BorrowedItem> ItemsLent { get; set; }
  }
}
