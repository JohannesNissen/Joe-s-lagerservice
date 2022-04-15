using Domain.Enums;

namespace Application.ExampleChildren.Commands
{
  public class ExampleChildInputDto
  {
    public string Name { get; set; }
    public ExampleEnum Type { get; set; }
    public int ParentId { get; set; }
  }
}
