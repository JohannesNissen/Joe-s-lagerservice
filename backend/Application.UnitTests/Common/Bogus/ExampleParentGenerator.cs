using Bogus;
using Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Application.UnitTests.Common.Bogus
{
  public class ExampleParentGenerator
  {

    private readonly Faker<ExampleParent> _baseExampleParentFaker;


    public ExampleParentGenerator()
    {
      _baseExampleParentFaker = new Faker<ExampleParent>()
        .RuleFor(x => x.Name, y => y.Name.FullName())
        .RuleFor(x => x.Id, y => y.UniqueIndex + 1);
    }


    public List<ExampleParent> GenerateExampleParents(IEnumerable<int> idsToUse)
    {
      var faker = _baseExampleParentFaker.Clone();
      var ids = idsToUse.ToArray();

      var count = 0;

      faker.RuleFor(x => x.Id, x => ids[count++]);

      return faker.Generate(ids.Length);
    }


  }
}
