using System.Collections.Generic;
using System.Threading.Tasks;
using Angular1.Core.Models;

namespace Angular1.Core
{
    public interface IFeatureRepository
    {
        Task<List<Feature>> GetFeaturesAsync();
    }
}