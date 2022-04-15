using Bogus;
using Domain.Entities;
using Domain.Enums;
using System.Collections.Generic;
using System.Linq;

namespace Application.UnitTests.Common.Bogus
{
  public class ExampleChildGenerator
  {
    private readonly Faker<ExampleChild> _baseExampleChildFaker;

    public ExampleChildGenerator()
    {
      _baseExampleChildFaker = new Faker<ExampleChild>()
          .RuleFor(x => x.Id, y => y.UniqueIndex + 1)
          .RuleFor(x => x.Name, x => x.Name.FullName())
          .RuleFor(x => x.Type, x => x.PickRandom<ExampleEnum>());
    }


    public List<ExampleChild> GenerateExampleChildren(IEnumerable<int> specificIds, IEnumerable<int> parentIds = null)
    {
      var faker = _baseExampleChildFaker.Clone();
      var ids = specificIds.ToArray();

      var count = 0;
      faker.RuleFor(x => x.Id, x => ids[count++]);
      if (parentIds != null && parentIds.Any())
      {
        faker.RuleFor(x => x.ParentId, x => x.PickRandom(parentIds));
      }

      return faker.Generate(ids.Length);
    }

    public List<ExampleChild> GenerateExampleChildrenOntoExampleParents(IEnumerable<int> parentIds, int childCount)
    {
      var faker = _baseExampleChildFaker.Clone();

      var i = 0;
      var ids = parentIds.ToArray();

      faker.RuleFor(x => x.ParentId, x => ids[i++ % ids.Length]);


      return faker.Generate(ids.Length * childCount);
    }
  }
}
