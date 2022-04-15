using Infrastructure.Persistence;
using System.Collections.Generic;
using System.Linq;

namespace Application.UnitTests.Common.Bogus
{
  public static class ExampleSeedingExtensions
  {

    public static void SeedExampleChildren(this ApplicationDbContext context, IEnumerable<int> idsToUse, IEnumerable<int> parentIds = null)
    {
      var ecg = new ExampleChildGenerator();

      if (parentIds.Any())
      {
        var children = ecg.GenerateExampleChildren(idsToUse, parentIds);
        context.AddRange(children);
      }
      else
      {
        var children = ecg.GenerateExampleChildren(idsToUse);
        context.AddRange(children);
      }
      context.SaveChanges();
    }


    public static void SeedExampleParents(this ApplicationDbContext context, IEnumerable<int> idsToUse)
    {
      var epg = new ExampleParentGenerator();
      var parents = epg.GenerateExampleParents(idsToUse);
      context.AddRange(parents);
      context.SaveChanges();
    }
  }
}
