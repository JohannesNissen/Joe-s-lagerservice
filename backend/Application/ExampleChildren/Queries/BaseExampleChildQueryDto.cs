using Application.Common.Mappings;
using Domain.Entities;

namespace Application.ExampleChildren.Queries
{
  public class BaseExampleChildQueryDto : IAutoMap<ExampleChild>
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }
}
