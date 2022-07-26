using FluentValidation;
namespace Application.Users.Commands.VerifyUser
{
  public class VerifyUserCommandValidator : AbstractValidator<VerifyUserCommand>
  {
    public VerifyUserCommandValidator()
    {

      RuleFor(u => u.Email)
        .NotNull()
        .NotEmpty();

      RuleFor(u => u.Password)
        .NotNull()
        .NotEmpty()
        .MinimumLength(10);
    }
  }
}
