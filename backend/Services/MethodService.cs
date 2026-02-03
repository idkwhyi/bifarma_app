using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class MethodService : IMethodService
{
    private readonly AppDbContext _context;

    public MethodService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Method>> GetAllMethodsAsync()
    {
        return await _context.Methods.ToListAsync();
    }

    public async Task<Method?> GetMethodByIdAsync(long id)
    {
        return await _context.Methods.FindAsync(id);
    }

    public async Task<Method> CreateMethodAsync(Method method)
    {
        _context.Methods.Add(method);
        await _context.SaveChangesAsync();
        return method;
    }

    public async Task<Method> UpdateMethodAsync(long id, Method method)
    {
        var existingMethod = await _context.Methods.FindAsync(id);
        if (existingMethod == null)
        {
            return null;
        }

        existingMethod.Code = method.Code;
        existingMethod.Description = method.Description;
        existingMethod.IsActive = method.IsActive;
        existingMethod.LastUpdatedBy = method.LastUpdatedBy;
        existingMethod.LastUpdatedOn = method.LastUpdatedOn;

        await _context.SaveChangesAsync();
        return existingMethod;
    }

    public async Task<bool> DeleteMethodAsync(long id)
    {
        var method = await _context.Methods.FindAsync(id);
        if (method == null)
        {
            return false;
        }

        _context.Methods.Remove(method);
        await _context.SaveChangesAsync();
        return true;
    }
}