using backend.Models;

namespace backend.Services;

public interface IMethodService
{
    Task<List<Method>> GetAllMethodsAsync();
    Task<Method> GetMethodByIdAsync(long id);
    Task<Method> CreateMethodAsync(Method method);
    Task<Method> UpdateMethodAsync(long id, Method method);
    Task<bool> DeleteMethodAsync(long id);
}
