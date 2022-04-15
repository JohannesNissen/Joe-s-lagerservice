using Application.Common.Interfaces;
using FluentValidation.AspNetCore;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using NSwag;
using NSwag.Generation.Processors.Security;
using System.Linq;
using Web.DocumentProcessors;
using Web.Filters;
using Web.Services;

namespace Web
{
  public static class WebServiceConfiguration
  {

    public static void ConfigureServices(IServiceCollection services)
    {

      services.AddCors(options =>
      {
        options.AddPolicy("AllowAll",
          builder =>
          {
            builder.AllowAnyOrigin();
            builder.AllowAnyHeader();
            builder.AllowAnyMethod();
          });
      });

      services.AddHttpContextAccessor();
      services.AddHealthChecks().AddDbContextCheck<ApplicationDbContext>();
      services.AddControllers(options =>
                       options.Filters.Add<ApiExceptionFilterAttribute>())
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<IApplicationDbContext>())
                .AddNewtonsoftJson();

      services.Configure<ApiBehaviorOptions>(options =>
      {
        options.SuppressModelStateInvalidFilter = true;
      });

      services.AddOpenApiDocument(configure =>
      {
        configure.Title = "Backend API";
        configure.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
        {
          Type = OpenApiSecuritySchemeType.ApiKey,
          Name = "Authorization",
          In = OpenApiSecurityApiKeyLocation.Header,
          Description = "Bearer {your JWT token}."
        });

        configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
        configure.DocumentProcessors.Add(new CustomDocumentProcessor());
      });


      services.AddScoped<ICurrentUserService, CurrentUserService>();
      services.AddScoped<IAuthorizationService, AuthorizationService>();

      services.AddSignalR();
    }
  }
}
