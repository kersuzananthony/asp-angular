using System.Collections.Generic;
using System.Threading.Tasks;
using Angular1.Controllers.Resources;
using Angular1.Core;
using Angular1.Core.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Angular1.Controllers
{
    [Route("/api/[controller]")]
    public class FeaturesController : Controller
    {
        private readonly IFeatureRepository _featureRepository;
        
        private readonly IMapper _mapper;
        
        public FeaturesController(IFeatureRepository featureRepository, IMapper mapper)
        {
            _featureRepository = featureRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
        {
            var features = await _featureRepository.GetFeaturesAsync();

            return _mapper.Map<List<Feature>, List<KeyValuePairResource>>(features);
        }
    }
}