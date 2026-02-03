using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ParameterService : IParameterService
{
    private readonly AppDbContext _context;

    public ParameterService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Parameter>> GetAllParametersAsync()
    {
        return await _context.Parameters.ToListAsync();
    }

    public async Task<Parameter?> GetParameterByIdAsync(long id)
    {
        return await _context.Parameters.FindAsync(id);
    }

    public async Task<Parameter> CreateParameterAsync(Parameter parameter)
    {
        _context.Parameters.Add(parameter);
        await _context.SaveChangesAsync();
        return parameter;
    }

    public async Task<Parameter> UpdateParameterAsync(long id, Parameter parameter)
    {
        var existingParameter = await _context.Parameters.FindAsync(id);
        if (existingParameter == null)
        {
            return null;
        }

        existingParameter.Code = parameter.Code;
        existingParameter.Description = parameter.Description;
        existingParameter.IsActive = parameter.IsActive;
        existingParameter.LastUpdatedBy = parameter.LastUpdatedBy;
        existingParameter.LastUpdatedOn = parameter.LastUpdatedOn;

        await _context.SaveChangesAsync();
        return existingParameter;
    }

    public async Task<bool> DeleteParameterAsync(long id)
    {
        var parameter = await _context.Parameters.FindAsync(id);
        if (parameter == null)
        {
            return false;
        }

        _context.Parameters.Remove(parameter);
        await _context.SaveChangesAsync();
        return true;
    }
}