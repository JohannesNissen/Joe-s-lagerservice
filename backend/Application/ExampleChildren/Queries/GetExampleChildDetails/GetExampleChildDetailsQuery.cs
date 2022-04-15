using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ExampleChildren.Queries.GetExampleChildDetails
{
  [TODOAuthorize]
  public class GetExampleChildDetailsQuery : IRequest<ExampleChildDetailsQueryDto>
  {
    [JsonIgnore]
    public int Id { get; set; }

    public class GetExampleChildDetailsQueryHandler : IRequestHandler<GetExampleChildDetailsQuery, ExampleChildDetailsQueryDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetExampleChildDetailsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<ExampleChildDetailsQueryDto> Handle(GetExampleChildDetailsQuery request, CancellationToken cancellationToken)
      {
        var exampleChild = await _context.ExampleChildren.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (exampleChild == null)
          throw new NotFoundException(nameof(ExampleChild), request.Id);

        return _mapper.Map<ExampleChild, ExampleChildDetailsQueryDto>(exampleChild);
      }
    }
  }
}
