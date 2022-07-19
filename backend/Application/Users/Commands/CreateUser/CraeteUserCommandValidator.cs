using FluentValidation;
namespace Application.Users.Commands.CreateUser
{
  public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
  {
    public CreateUserCommandValidator()
    {
      RuleFor(u => u.UserRole)
        .NotEmpty()
        .NotNull();

      RuleFor(u => u.Email)
        .NotNull()
        .NotEmpty();

      RuleFor(u => u.LeadId)
        .NotNull();

      RuleFor(u => u.Password)
        .NotNull()
        .NotEmpty()
        .MinimumLength(10);
    }
  }
}
