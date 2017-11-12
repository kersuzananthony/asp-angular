using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular1.Core;
using Angular1.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Angular1.Database.Repositories
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext _context;

        public PhotoRepository(VegaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            return await _context.Photos
                .Where(p => p.VehicleId == vehicleId)
                .ToListAsync();
        }
    }
}