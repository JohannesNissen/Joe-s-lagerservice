using Application.Common.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System.IO;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
  public class EmailService : IEmailService
  {

    private readonly MailOptions _mailOptions;

    public EmailService(IOptions<MailOptions> options)
    {
      _mailOptions = options.Value;
    }
    public async Task SendEmail(MailRequest mailRequest)
    {
      var email = new MimeMessage();
      email.Sender = MailboxAddress.Parse(_mailOptions.Mail);
      email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
      email.Subject = mailRequest.Subject;
      var builder = new BodyBuilder();

      if (mailRequest.Attachments != null)
      {
        byte[] fileBytes;
        foreach (var file in mailRequest.Attachments)
        {
          if (file.Length > 0)
          {
            using (var ms = new MemoryStream())
            {
              file.CopyTo(ms);
              fileBytes = ms.ToArray();
            }
            builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
          }
        }
      }
      builder.HtmlBody = mailRequest.Body;
      email.Body = builder.ToMessageBody();
      using var smtp = new SmtpClient();
      smtp.Connect(_mailOptions.Host, _mailOptions.Port, SecureSocketOptions.StartTls);
      smtp.Authenticate(_mailOptions.Mail, _mailOptions.Password);
      await smtp.SendAsync(email);
      smtp.Disconnect(true);
    }
  }
}
