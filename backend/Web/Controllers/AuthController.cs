using Application.Common.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Web.Controllers
{

  public class AuthController : ApiControllerBase
  {
    private static string TEMP_TOKEN = "abs";
    private readonly IEmailService mailService;
    public AuthController(IEmailService mailService)
    {
      this.mailService = mailService;
    }
    [HttpPost("send")]
    public async Task<IActionResult> SendMail([FromForm] MailRequest request)
    {
      try
      {
        await mailService.SendEmail(request);
        return Ok();
      }
      catch (Exception)
      {
        throw;
      }

    }

    [HttpPost]
    public ActionResult<string> Login()
    {
      return TEMP_TOKEN;
    }

    [HttpPut]
    public ActionResult<bool> CheckAuth()
    {
      if (!Request.Headers.TryGetValue("Authorization", out var auth))
      {
        return false;
      }

      Regex r = new Regex(@"^Bearer (\S+)$", RegexOptions.IgnoreCase);
      Match m = r.Match(auth);
      var g = m.Groups[1].Captures[0].Value;

      return g == TEMP_TOKEN;
    }
  }
}
