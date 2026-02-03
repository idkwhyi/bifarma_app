using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class SampleTypeService : ISampleTypeService
{
    private readonly AppDbContext _context;

    public SampleTypeService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<SampleType>> GetAllSampleTypesAsync()
    {
        return await _context.SampleTypes.ToListAsync();
    }

    public async Task<SampleType?> GetSampleTypeByIdAsync(long id)
    {
        return await _context.SampleTypes.FindAsync(id);
    }

    public async Task<SampleType> CreateSampleTypeAsync(SampleType sampleType)
    {
        _context.SampleTypes.Add(sampleType);
        await _context.SaveChangesAsync();
        return sampleType;
    }

    public async Task<SampleType> UpdateSampleTypeAsync(long id, SampleType sampleType)
    {
        var existingSampleType = await _context.SampleTypes.FindAsync(id);
        if (existingSampleType == null)
        {
            return null;
        }

        existingSampleType.Code = sampleType.Code;
        existingSampleType.Description = sampleType.Description;
        existingSampleType.IsActive = sampleType.IsActive;
        existingSampleType.LastUpdatedBy = sampleType.LastUpdatedBy;
        existingSampleType.LastUpdatedOn = sampleType.LastUpdatedOn;

        await _context.SaveChangesAsync();
        return existingSampleType;
    }

    public async Task<bool> DeleteSampleTypeAsync(long id)
    {
        var sampleType = await _context.SampleTypes.FindAsync(id);
        if (sampleType == null)
        {
            return false;
        }

        _context.SampleTypes.Remove(sampleType);
        await _context.SaveChangesAsync();
        return true;
    }
}