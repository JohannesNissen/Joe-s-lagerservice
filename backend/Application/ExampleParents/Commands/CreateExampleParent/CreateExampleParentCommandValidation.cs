using FluentValidation;

namespace Application.ExampleParents.Commands.CreateExampleParent
{
  public class CreateExampleParentCommandValidation : AbstractValidator<CreateExampleParentCommand>
  {
    public CreateExampleParentCommandValidation()
    {
      RuleFor(e => e.Name)
          .MaximumLength(200)
          .NotEmpty();
    }
  }
}
