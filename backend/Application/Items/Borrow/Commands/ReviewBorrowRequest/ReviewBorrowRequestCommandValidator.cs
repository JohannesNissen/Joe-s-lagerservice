using FluentValidation;

namespace Application.Items.Commands.ReviewBorrowRequest
{
  public class ReviewBorrowRequestCommandValidator : AbstractValidator<ReviewBorrowRequestCommand>
  {
    public ReviewBorrowRequestCommandValidator()
    {

      RuleFor(x => x.BorrowedItemId)
        .NotNull()
        .NotEmpty();

      RuleFor(item => item.ReviewerId)
        .NotEmpty()
        .NotNull();

      RuleFor(item => item.Amount)
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
