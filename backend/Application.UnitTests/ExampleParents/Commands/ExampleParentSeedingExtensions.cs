using Application.UnitTests.Common.Bogus;
using Infrastructure.Persistence;
using System.Collections.Generic;

namespace Application.UnitTests.ExampleParents.Commands
{
  public static class ExampleParentSeedingExtensions
  {
    public static void SeedExampleChildrenOntoExampleParents(this ApplicationDbContext context, IEnumerable<int> parentIds, int childCount)
    {
      var ecg = new ExampleChildGenerator();

      var children = ecg.GenerateExampleChildrenOntoExampleParents(parentIds, childCount);

      context.AddRange(children);
      context.SaveChanges();

    }
  }
}
