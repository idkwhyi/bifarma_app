using backend.Models;

namespace backend.Services;

public interface IAnalysisService
{
    Task<List<Analysis>> GetAllAnalysesAsync();
    Task<Analysis> GetAnalysisByIdAsync(long id);
    Task<Analysis> CreateAnalysisAsync(Analysis analysis);
    Task<Analysis> UpdateAnalysisAsync(long id, Analysis analysis);
    Task<bool> DeleteAnalysisAsync(long id);
}
