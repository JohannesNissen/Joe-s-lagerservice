
using Application;
using Application.Common.SignalR.Hubs;
using Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Web;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((hostBuilderContext, loggerConfiguration) =>
{
  loggerConfiguration.ReadFrom.Configuration(hostBuilderContext.Configuration);
});

builder.Logging.AddSerilog();
builder.Logging.AddAzureWebAppDiagnostics();

ApplicationServiceConfiguration.ConfigureServices(builder.Services);
InfrastructureServiceConfiguration.ConfigureServices(builder.Services, builder.Configuration, builder.Environment);
WebServiceConfiguration.ConfigureServices(builder.Services);


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseDeveloperExceptionPage();
}
else
{
  app.UseExceptionHandler("/Error");
  // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
  app.UseHsts();
}

app.UseCors("AllowAll");

app.UseSerilogRequestLogging();
app.UseHealthChecks("/health");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSwaggerUi3(settings =>
{
  settings.Path = "/swagger";
  settings.DocumentPath = "/swagger/specification.json";
});

app.UseRouting();

//TODO add auth.
//app.UseAuthentication();
//app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
  endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

  endpoints.MapHub<ExampleHub>("/hubs/exampleHub"); // Please follow a cohesive naming convention.
});

app.Run();
