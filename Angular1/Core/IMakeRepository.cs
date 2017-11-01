using System.Collections.Generic;
using System.Threading.Tasks;
using Angular1.Core.Models;

namespace Angular1.Core
{
    public interface IMakeRepository
    {
        Task<List<Make>> GetMakesAsync(bool includeRelated = true);

        Task<Make> GetMakeAsync(int id, bool includeRelated = true);
    }
}