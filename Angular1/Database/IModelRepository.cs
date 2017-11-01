using System.Threading.Tasks;
using Angular1.Models;

namespace Angular1.Database
{
    public interface IModelRepository
    {
        Task<Model> GetModelAsync(int id);
    }
}