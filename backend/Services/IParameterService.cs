using backend.Models;

namespace backend.Services;

public interface IParameterService
{
    Task<List<Parameter>> GetAllParametersAsync();
    Task<Parameter> GetParameterByIdAsync(long id);
    Task<Parameter> CreateParameterAsync(Parameter parameter);
    Task<Parameter> UpdateParameterAsync(long id, Parameter parameter);
    Task<bool> DeleteParameterAsync(long id);
}
