using Application.ExampleParents.Commands.CreateExampleParent;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Application.UnitTests.ExampleChildLists.Commands.CreateExampleChildList
{
  public class CreateExampleParentCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Command_ValidInput_ShouldPersistExampleParent()
    {
      var command = new CreateExampleParentCommand
      {
        Name = "CreateTest"
      };

      var handler = new CreateExampleParentCommand.CreateExampleParentCommandHandler(Context);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = await Context.ExampleParents.FirstOrDefaultAsync(x => x.Id == result, CancellationToken.None);

      entity.Should().NotBeNull();
      entity.Name.Should().Be(command.Name);
    }

  }
}
