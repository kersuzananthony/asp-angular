using System.Threading.Tasks;
using Angular1.Core;
using Angular1.Core.Models;

namespace Angular1.Database.Repositories
{
    public class ModelRepository : IModelRepository
    {
        private readonly VegaDbContext _context;

        public ModelRepository(VegaDbContext context)
        {
            _context = context;
        }

        public async Task<Model> GetModelAsync(int id)
        {
            return await _context.Models.FindAsync(id);
        }
    }
}