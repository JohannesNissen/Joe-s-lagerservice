using Application.Users;
using Application.Users.Queries.GetUserProfile;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class ProfileController : ApiControllerBase
  {

    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfileDto>> getUserInfo([FromRoute] int userId, CancellationToken cancellationToken)
    {
      return await Mediator.Send(new GetUserProfileQuery { UserId = userId }, cancellationToken);
    }
  }
}
