using Application.Users;
using Application.Users.Commands.CreateUser;
using Application.Users.Queries.GetAllUsers;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class UserController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> CreateParent([FromBody] CreateUserCommand command, CancellationToken cancellationToken)
    {
      return await Mediator.Send(command, cancellationToken);
    }

    public async Task<ActionResult<List<UserIdDto>>> GetAllUsers(CancellationToken cancellationToken)
    {
      return await Mediator.Send(new GetAllUsersQuery(), cancellationToken);
    }
  }
}
