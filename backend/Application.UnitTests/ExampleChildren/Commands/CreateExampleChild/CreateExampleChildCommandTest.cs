using Application.Common.Exceptions;
using Application.Common.SignalR.Hubs;
using Application.Common.SignalR.Interfaces.HubContexts;
using Application.ExampleChildren.Commands;
using Application.ExampleChildren.Commands.CreateExampleChild;
using Application.UnitTests.Common.Bogus;
using Application.UnitTests.Common.SignalR.Mocks.Hubs;
using Domain.Enums;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Application.UnitTests.ExampleChildren.Commands.CreateExampleChild
{
  public class CreateExampleChildCommandTest : CommandTestBase
  {
    private readonly IEnumerable<int> _parentIds;
    private readonly IEnumerable<int> _childIds;

    public CreateExampleChildCommandTest()
    {
      _parentIds = Enumerable.Range(1, 10);
      _childIds = Enumerable.Range(1, 100);

      Context.SeedExampleParents(_parentIds);
      Context.SeedExampleChildren(_childIds, _parentIds);
    }

    [Fact]
    public async Task Command_ValidInput_PersistExampleChild()
    {
      var command = new CreateExampleChildCommand
      {
        Child = new ExampleChildInputDto
        {
          Name = "Young Test",
          Type = ExampleEnum.Youngest,
          ParentId = 1
        }
      };

      var hubContextMock = HubMock<ExampleHub, IExampleHubService>.SetupMock(
        new List<Expression<Func<IExampleHubService, Task>>>
        {
          (obj) => obj.ReceiveMessage(null)
        }
      );

      var handler = new CreateExampleChildCommand.CreateExampleChildCommandHandler(Context, hubContextMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = await Context.ExampleChildren.FirstOrDefaultAsync(x => x.Id == result, CancellationToken.None);

      entity.Should().NotBeNull();
      entity.Name.Should().Be(command.Child.Name);
      entity.Type.Should().Be(command.Child.Type);
      entity.ParentId.Should().Be(command.Child.ParentId);
    }

    [Fact]
    public async Task Command_InvalidInput_ThrowsNotFoundException()
    {
      var command = new CreateExampleChildCommand
      {
        Child = new ExampleChildInputDto
        {
          Name = "Young Test",
          Type = ExampleEnum.Youngest,
          ParentId = 100
        }
      };

      var hubContextMock = HubMock<ExampleHub, IExampleHubService>.SetupMock(
        new List<Expression<Func<IExampleHubService, Task>>>
        {
          (obj) => obj.ReceiveMessage(null)
        }
      );

      var handler = new CreateExampleChildCommand.CreateExampleChildCommandHandler(Context, hubContextMock.Object);
      var action = async () => await handler.Handle(command, CancellationToken.None);

      await action.Should().ThrowAsync<NotFoundException>();
    }
  }
}
