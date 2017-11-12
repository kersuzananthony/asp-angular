using System.Collections.Generic;
using System.Threading.Tasks;
using Angular1.Core.Models;

namespace Angular1.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}