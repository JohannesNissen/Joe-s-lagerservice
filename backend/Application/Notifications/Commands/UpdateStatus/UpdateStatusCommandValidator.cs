

using FluentValidation;

namespace Application.Notifications.Commands.UpdateStatus
{
  public class UpdateStatusCommandValidator : AbstractValidator<UpdateStatusCommand>
  {
    public UpdateStatusCommandValidator()
    {
      RuleFor(x => x.NotificationId)
        .NotNull()
        .NotEmpty();
    }
  }
}
