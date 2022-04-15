using Application.Common.Exceptions;
using Application.ExampleChildren.Commands;
using Application.ExampleChildren.Commands.UpdateExampleChild;
using Application.UnitTests.Common.Bogus;
using Domain.Enums;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Application.UnitTests.ExampleChildren.Commands.UpdateExampleChild
{
  public class UpdateExampleChildCommandTest : CommandTestBase
  {

    private readonly IEnumerable<int> _parentIds;
    private readonly IEnumerable<int> _childIds;

    public UpdateExampleChildCommandTest()
    {
      _parentIds = Enumerable.Range(1, 10);
      _childIds = Enumerable.Range(1, 100);

      Context.SeedExampleParents(_parentIds);
      Context.SeedExampleChildren(_childIds, _parentIds);
    }

    [Fact]
    public async Task Command_ValidId_ShouldUpdatePersistedExampleChild()
    {
      var command = new UpdateExampleChildCommand
      {
        Id = 1,
        Child = new ExampleChildInputDto
        {
          Name = "TestUpdate",
          Type = ExampleEnum.Youngest,
          ParentId = 1
        }
      };

      var handler = new UpdateExampleChildCommand.UpdateExampleChildCommandHandler(Context);

      await handler.Handle(command, CancellationToken.None);

      var entity = await Context.ExampleChildren.FirstOrDefaultAsync(x => x.Id == command.Id, CancellationToken.None);

      entity.Should().NotBeNull();
      entity.Name.Should().Be(command.Child.Name);
      entity.ParentId.Should().Be(command.Child.ParentId);
      entity.Type.Should().Be(command.Child.Type);
    }

    [Fact]
    public void Command_InvalidId_ThrowsNotFoundException()
    {
      var command = new UpdateExampleChildCommand
      {
        Id = 999,
        Child = new ExampleChildInputDto
        {
          Name = "TestUpdate",
          Type = ExampleEnum.Youngest,
          ParentId = 1
        }
      };

      var handler = new UpdateExampleChildCommand.UpdateExampleChildCommandHandler(Context);
      var action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().ThrowAsync<NotFoundException>();
    }

    [Fact]
    public void Command_InvalidParentId_ThrowsNotFoundException()
    {
      var command = new UpdateExampleChildCommand
      {
        Id = 1,
        Child = new ExampleChildInputDto
        {
          Name = "TestUpdate",
          Type = ExampleEnum.Youngest,
          ParentId = 99
        }
      };

      var handler = new UpdateExampleChildCommand.UpdateExampleChildCommandHandler(Context);
      var action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().ThrowAsync<NotFoundException>();

    }
  }
}
