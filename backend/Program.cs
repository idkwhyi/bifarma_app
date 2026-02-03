
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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

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
