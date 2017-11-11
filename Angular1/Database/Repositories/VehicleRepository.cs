using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular1.Core;
using Angular1.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Angular1.Database.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext _context;

        public VehicleRepository(VegaDbContext context)
        {
            _context = context;
        }

        public async Task<List<Vehicle>> GetVehiclesAsync(VehicleFilter filter)
        {
            var query = _context.Vehicles
                .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .AsQueryable();

            if (filter.MakeId.HasValue)
            {
                query = query.Where(v => v.Model.MakeId == filter.MakeId.Value);
            }

            if (filter.ModelId.HasValue)
            {
                query = query.Where(v => v.ModelId == filter.ModelId.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true)
        {
            if (!includeRelated)
            {
                return await _context.Vehicles.FindAsync(id);
            }
            else
            {
                return await _context.Vehicles
                    .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                    .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                    .SingleOrDefaultAsync(v => v.Id == id);
            }
        }

        public void Add(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            _context.Vehicles.Remove(vehicle);
        }
    }
    
    
}