using System.Threading.Tasks;
using Angular1.Models;

namespace Angular1.Database
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