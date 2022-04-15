using Application.Common.Mappings;
using AutoMapper;
using Infrastructure.Persistence;
using System;

namespace Application.UnitTests
{
  public class QueryTestBase : IDisposable
  {
    public QueryTestBase()
    {
      Context = ApplicationDbContextFactory.Create();

      var configurationProvider = new MapperConfiguration(cfg =>
      {
        cfg.AddProfile<MappingProfile>();
      });

      Mapper = configurationProvider.CreateMapper();
    }
    public IMapper Mapper { get; }


    public ApplicationDbContext Context { get; }

    public void Dispose()
    {
      ApplicationDbContextFactory.Destroy(Context);
    }
  }
}
