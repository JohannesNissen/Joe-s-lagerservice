

using Application.Common.Mappings;
using Domain.Entities;
using Domain.Enums;

namespace Application.Users
{
  public class UserIdDto : IAutoMap<User>
  {
    public int Name { get; set; }
    public string Email { get; set; }
    public UserRole UserRole { get; set; }
  }
}
