using AutoMapper;
using Domain.Entities;
using Domain.Enums;

namespace Application.ExampleChildren.Queries.GetExampleChildDetails
{
  public class ExampleChildDetailsQueryDto : BaseExampleChildQueryDto
  {
    public ExampleEnum Type { get; set; }
    public ExampleChildParentDto Parent { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<ExampleChild, ExampleChildDetailsQueryDto>()
        .IncludeBase<ExampleChild, BaseExampleChildQueryDto>();
    }
  }
}
