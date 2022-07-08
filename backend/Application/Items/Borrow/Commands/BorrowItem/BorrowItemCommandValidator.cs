
using FluentValidation;

namespace Application.Items.Commands.BorrowItem
{
  public class BorrowItemCommandValidator : AbstractValidator<BorrowItemCommand>
  {
    public BorrowItemCommandValidator()
    {
      RuleFor(x => x.ItemId)
        .NotNull()
        .NotEmpty();

      RuleFor(item => item.UserId)
        .NotEmpty()
        .NotNull();

      RuleFor(item => item.amount)
        .NotEmpty()
        .NotNull();

      RuleFor(item => item.EndDate)
        .NotEmpty()
        .NotNull();

      RuleFor(item => item.StartDate)
        .NotEmpty()
        .NotNull();
    }
  }
}
