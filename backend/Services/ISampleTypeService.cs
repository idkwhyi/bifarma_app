using backend.Models;

namespace backend.Services;

public interface ISampleTypeService
{
    Task<List<SampleType>> GetAllSampleTypesAsync();
    Task<SampleType> GetSampleTypeByIdAsync(long id);
    Task<SampleType> CreateSampleTypeAsync(SampleType sampleType);
    Task<SampleType> UpdateSampleTypeAsync(long id, SampleType sampleType);
    Task<bool> DeleteSampleTypeAsync(long id);
}
