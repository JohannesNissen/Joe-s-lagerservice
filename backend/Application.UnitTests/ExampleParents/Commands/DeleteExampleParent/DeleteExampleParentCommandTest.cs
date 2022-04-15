using Application.Common.Exceptions;
using Application.UnitTests.Common.Bogus;
using Application.UnitTests.ExampleParents.Commands;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Application.UnitTests.ExampleChildLists.Commands.CreateExampleChildList
{
  public class DeleteExampleParentCommandTest : CommandTestBase
  {


    private readonly IEnumerable<int> _parentIds;
    private readonly IEnumerable<int> _childLessParentIds;

    public DeleteExampleParentCommandTest()
    {
      _parentIds = Enumerable.Range(1, 99);
      _childLessParentIds = Enumerable.Range(100, 10);
      Context.SeedExampleParents(_parentIds.Concat(_childLessParentIds));
      Context.SeedExampleChildrenOntoExampleParents(_parentIds, 2);
    }

    [Fact]
    public async Task Command_ValidInput_RemoveExampleParent()
    {
      const int parentIdToDelete = 101;

      var command = new DeleteExampleParent
      {
        Id = parentIdToDelete
      };

      var handler = new DeleteExampleParent.DeleteExampleParentHandler(Context);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = await Context.ExampleParents.FirstOrDefaultAsync(x => x.Id == parentIdToDelete, CancellationToken.None);

      entity.Should().BeNull();
    }

    [Fact]
    public async Task Command_ValidInputWithChildren_ThrowsCommandErrorCodeException()
    {
      const int parentIdToDelete = 10;

      var command = new DeleteExampleParent
      {
        Id = parentIdToDelete
      };

      var handler = new DeleteExampleParent.DeleteExampleParentHandler(Context);

      var action = async () => await handler.Handle(command, CancellationToken.None);

      var exception = await action.Should().ThrowAsync<CommandErrorCodeException>();
      exception.And.CommandErrorCodes.Should().ContainKey(CommandErrorCode.ExampleParentCustomErrorCode.ToString());
    }

  }
}
