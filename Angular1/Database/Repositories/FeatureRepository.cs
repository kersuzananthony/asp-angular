using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using Angular1.Core;
using Angular1.Core.Models;

namespace Angular1.Database.Repositories
{
    public class FeatureRepository : IFeatureRepository
    {
        private readonly VegaDbContext _context;

        public FeatureRepository(VegaDbContext context)
        {
            _context = context;
        }

        public async Task<List<Feature>> GetFeaturesAsync()
        {
            return await _context.Features.ToListAsync();
        }
    }
}