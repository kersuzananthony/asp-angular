using System.Collections.Generic;
using System.Threading.Tasks;
using Angular1.Core.Models;

namespace Angular1.Core
{
    public interface IVehicleRepository
    {
        Task<List<Vehicle>> GetVehiclesAsync(VehicleQuery queryObject);
        
        Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);

        void Add(Vehicle vehicle);

        void Remove(Vehicle vehicle);
    }
}