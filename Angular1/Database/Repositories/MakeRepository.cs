using System.Collections.Generic;
using System.Threading.Tasks;
using Angular1.Core;
using Angular1.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Angular1.Database.Repositories
{
    public class MakeRepository : IMakeRepository
    {
        private readonly VegaDbContext _context;

        public MakeRepository(VegaDbContext context)
        {
            _context = context;
        }

        public async Task<List<Make>> GetMakesAsync(bool includeRelated = true)
        {
            if (includeRelated)
                return await _context.Makes.Include(m => m.Models).ToListAsync();
            
            return await _context.Makes.ToListAsync();
        }

        public async Task<Make> GetMakeAsync(int id, bool includeRelated = true)
        {
            if (includeRelated)
                return await _context.Makes.Include(m => m.Models).FirstOrDefaultAsync(m => m.Id == id);

            return await _context.Makes.FindAsync(id);
        }
    }
}