
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
  public interface IEmailService
  {
    Task SendEmail(MailRequest mailRequest);
  }
}
