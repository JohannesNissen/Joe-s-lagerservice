using Application.Common.Mappings;
using Domain.Entities;

namespace Application.ExampleChildren.Queries.GetExampleChildDetails
{
  public class ExampleChildParentDto : IAutoMap<ExampleParent>
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }
}
