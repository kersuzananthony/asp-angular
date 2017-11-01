using System.Threading.Tasks;
using Angular1.Core.Models;

namespace Angular1.Core
{
    public interface IModelRepository
    {
        Task<Model> GetModelAsync(int id);
    }
}