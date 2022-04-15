using Application.Common.Exceptions;
using Application.ExampleChildren.Commands.DeleteExampleChild;
using Application.UnitTests.Common.Bogus;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Application.UnitTests.ExampleChildren.Commands.DeleteExampleChild
{
  public class DeleteExampleChildCommandTest : CommandTestBase
  {
    private readonly IEnumerable<int> _parentIds;
    private readonly IEnumerable<int> _childIds;

    public DeleteExampleChildCommandTest()
    {
      _parentIds = Enumerable.Range(1, 10);
      _childIds = Enumerable.Range(1, 100);

      Context.SeedExampleParents(_parentIds);
      Context.SeedExampleChildren(_childIds, _parentIds);
    }

    [Fact]
    public async Task Command_ValidId_RemovePersistedExampleChild()
    {
      var command = new DeleteExampleChildCommand
      {
        Id = 1
      };

      var handler = new DeleteExampleChildCommand.DeleteExampleChildCommandHandler(Context);

      await handler.Handle(command, CancellationToken.None);

      var entity = await Context.ExampleChildren.FirstOrDefaultAsync(x => x.Id == command.Id, CancellationToken.None);

      entity.Should().BeNull();
    }

    [Fact]
    public async Task Command_InvalidId_ThrowNotFoundException()
    {
      var command = new DeleteExampleChildCommand
      {
        Id = 1000
      };

      var handler = new DeleteExampleChildCommand.DeleteExampleChildCommandHandler(Context);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      await action.Should().ThrowAsync<NotFoundException>();
    }
  }
}
