using Application.ExampleChildren.Queries;
using Application.ExampleChildren.Queries.GetExampleChildren;
using Application.UnitTests.Common.Bogus;
using FluentAssertions;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Application.UnitTests.ExampleChildren.Queries.GetExampleChildren
{
  public class GetExampleChildrenQueryTest : QueryTestBase
  {
    [Fact]
    public async Task Handle_ReturnsCorrectVmAndExampleChildrenCount()
    {
      Context.SeedExampleParents(Enumerable.Range(1, 100));
      Context.SeedExampleChildren(Enumerable.Range(1, 100), Enumerable.Range(1, 100));

      var query = new GetExampleChildrenQuery();

      var handler = new GetExampleChildrenQuery.GetExampleChildrenQueryHandler(Context, Mapper);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<BaseExampleChildQueryDto>>();
      result.Count.Should().Be(100);
    }
  }
}
