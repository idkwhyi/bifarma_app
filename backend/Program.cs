
using backend.Data;
using backend.Services;
using backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ISampleTypeService, SampleTypeService>();
builder.Services.AddScoped<IParameterService, ParameterService>();
builder.Services.AddScoped<IMethodService, MethodService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var method = app.MapGroup("/methods");

method.MapGet("/", async (IMethodService service) => await service.GetAllMethodsAsync());

method.MapGet("/{id}", async (long id, IMethodService service) =>
    await service.GetMethodByIdAsync(id) is Method method ? Results.Ok(method) : Results.NotFound());

method.MapPost("/", async (Method method, IMethodService service) =>
{
    var createdMethod = await service.CreateMethodAsync(method);
    return Results.Created($"/methods/{createdMethod.Id}", createdMethod);
});

method.MapPut("/{id}", async (long id, Method method, IMethodService service) =>
{
    var updatedMethod = await service.UpdateMethodAsync(id, method);
    return updatedMethod is null ? Results.NotFound() : Results.Ok(updatedMethod);
});

method.MapDelete("/{id}", async (long id, IMethodService service) =>
{
    var result = await service.DeleteMethodAsync(id);
    return result ? Results.NoContent() : Results.NotFound();
});

var parameter = app.MapGroup("/parameters");

parameter.MapGet("/", async (IParameterService service) => await service.GetAllParametersAsync());

parameter.MapGet("/{id}", async (long id, IParameterService service) =>
    await service.GetParameterByIdAsync(id) is Parameter parameter ? Results.Ok(parameter) : Results.NotFound());

parameter.MapPost("/", async (Parameter parameter, IParameterService service) =>
{
    var createdParameter = await service.CreateParameterAsync(parameter);
    return Results.Created($"/parameters/{createdParameter.Id}", createdParameter);
});

parameter.MapPut("/{id}", async (long id, Parameter parameter, IParameterService service) =>
{
    var updatedParameter = await service.UpdateParameterAsync(id, parameter);
    return updatedParameter is null ? Results.NotFound() : Results.Ok(updatedParameter);
});

parameter.MapDelete("/{id}", async (long id, IParameterService service) =>
{
    var result = await service.DeleteParameterAsync(id);
    return result ? Results.NoContent() : Results.NotFound();
});

var sampleTypes = app.MapGroup("/sample-types");

sampleTypes.MapGet("/", async (ISampleTypeService service) => await service.GetAllSampleTypesAsync());

sampleTypes.MapGet("/{id}", async (long id, ISampleTypeService service) =>
    await service.GetSampleTypeByIdAsync(id) is SampleType sampleType ? Results.Ok(sampleType) : Results.NotFound());

sampleTypes.MapPost("/", async (SampleType sampleType, ISampleTypeService service) =>
{
    var createdSampleType = await service.CreateSampleTypeAsync(sampleType);
    return Results.Created($"/sample-types/{createdSampleType.Id}", createdSampleType);
});

sampleTypes.MapPut("/{id}", async (long id, SampleType sampleType, ISampleTypeService service) =>
{
    var updatedSampleType = await service.UpdateSampleTypeAsync(id, sampleType);
    return updatedSampleType is null ? Results.NotFound() : Results.Ok(updatedSampleType);
});

sampleTypes.MapDelete("/{id}", async (long id, ISampleTypeService service) =>
{
    var result = await service.DeleteSampleTypeAsync(id);
    return result ? Results.NoContent() : Results.NotFound();
});

app.Run();
