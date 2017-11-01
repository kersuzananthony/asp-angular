using System.Threading.Tasks;
using Angular1.Models;

namespace Angular1.Database
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);

        void Add(Vehicle vehicle);

        void Remove(Vehicle vehicle);
    }
}