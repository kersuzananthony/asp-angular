using System.Collections.Generic;
using System.Threading.Tasks;
using Angular1.Controllers.Resources;
using Angular1.Database;
using Angular1.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Angular1.Controllers
{
    [Route("/api/[controller]")]
    public class FeaturesController : Controller
    {
        private VegaDbContext _context;

        private IMapper _mapper;
        
        public FeaturesController(VegaDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
        {
            var features = await _context.Features.ToListAsync();

            return _mapper.Map<List<Feature>, List<KeyValuePairResource>>(features);
        }
    }
}