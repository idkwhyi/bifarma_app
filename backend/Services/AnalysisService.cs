using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class AnalysisService : IAnalysisService
{
    private readonly AppDbContext _context;

    public AnalysisService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Analysis>> GetAllAnalysesAsync()
    {
        return await _context.Analyses
            .Include(a => a.Parameter)
            .Include(a => a.Method)
            .Include(a => a.SampleType)
            .ToListAsync();
    }

    public async Task<Analysis> GetAnalysisByIdAsync(long id)
    {
        return await _context.Analyses
            .Include(a => a.Parameter)
            .Include(a => a.Method)
            .Include(a => a.SampleType)
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<Analysis> CreateAnalysisAsync(Analysis analysis)
    {
        _context.Analyses.Add(analysis);
        await _context.SaveChangesAsync();
        return analysis;
    }

    public async Task<Analysis> UpdateAnalysisAsync(long id, Analysis analysis)
    {
        var existingAnalysis = await _context.Analyses.FindAsync(id);
        if (existingAnalysis == null)
        {
            return null;
        }

        existingAnalysis.Code = analysis.Code;
        existingAnalysis.Description = analysis.Description;
        existingAnalysis.IsActive = analysis.IsActive;
        existingAnalysis.LastUpdatedBy = analysis.LastUpdatedBy;
        existingAnalysis.LastUpdatedOn = analysis.LastUpdatedOn;
        
        // Update relationships if provided, though typically IDs are updated.
        // Assuming the input analysis object has the correct foreign keys set.
        existingAnalysis.ParameterId = analysis.ParameterId;
        existingAnalysis.MethodId = analysis.MethodId;
        existingAnalysis.SampleTypeId = analysis.SampleTypeId;
        existingAnalysis.LeadTime = analysis.LeadTime;

        await _context.SaveChangesAsync();
        
        // Reload to get included properties if needed, or just return existing
        return existingAnalysis;
    }

    public async Task<bool> DeleteAnalysisAsync(long id)
    {
        var analysis = await _context.Analyses.FindAsync(id);
        if (analysis == null)
        {
            return false;
        }

        _context.Analyses.Remove(analysis);
        await _context.SaveChangesAsync();
        return true;
    }
}
